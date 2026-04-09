import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';//cors is downloaded because frontend and backend both hv different ports so in order for backend 
// to communicate with frontend and browser doesnt hv any prblms, cors is downloaded
//Browser = strict security guard, Backend = building, Guard says:“Visitors from other cities not allowed.” CORS = permission letter.
import axios from 'axios';
import { LoggedIn } from './middleware.js';
import connectDB from './configuration/db.js';
import User from './model/userSchema.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
  origin: "https://route-wise-git-main-kavya4.vercel.app",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
}); 


connectDB();

const ROUTE_KEY = process.env.DIRECTIONS_API
const PLACES_KEY = process.env.PLACES_API
const PHOTOS_KEY = process.env.PHOTOS_API
const GROQ_KEY = process.env.GROQ_API
const secret = process.env.JWT_SECRET

//basically this route has MapCard routing
app.post("/trip", async (req, res) => {
  try {

    //FIRST API USAGE
    //first step: from frontend, backend got the results
    const { startLocation, endLocation, preferences, date, travellers } = req.body;
    console.log("From frontend data is received:", startLocation, endLocation);
    const avoidTolls = preferences?.includes("Toll-free");
    const avoidHighways = preferences?.includes("Avoid-Highways");
    const shortest = preferences?.includes("Shortest");

    const avoidFeatures = [];
    if(avoidTolls){
      avoidFeatures.push("tollways");
    }
    if(avoidHighways){
      avoidFeatures.push("highways");
    }
  
    let preferredChange = "fastest";
    if(shortest){
      preferredChange = "shortest";
    }

    //second step is converting city names to coordinates
    const startGeo = await axios.get("https://api.openrouteservice.org/geocode/search",
      {
        params: {
          text: startLocation
        },
        headers:{
          Authorization: ROUTE_KEY
        }
      }
    );
    const endGeo = await axios.get("https://api.openrouteservice.org/geocode/search",
      {
        params: {
          text: endLocation
        },
        headers:{
          Authorization: ROUTE_KEY
        }
      }
    );
    if (!startGeo.data.features?.length || !endGeo.data.features?.length) {
  return res.status(400).json({
    error: "Invalid location name. Please enter a valid city."
  });
}

    //third step is to extract the coordinates
    const startCoordinates = startGeo.data.features[0].geometry.coordinates;

    const endCoordinates = endGeo.data.features[0].geometry.coordinates;

    //fourth step is with help of these coordinates we'll get distance,route map,total time
    const routeResponse = await axios.post(`https://api.openrouteservice.org/v2/directions/driving-car/geojson`,
      {
        coordinates: [startCoordinates, endCoordinates], //situating the coords
        preference: preferredChange,
        options: avoidFeatures.length ? {avoid_features: avoidFeatures}:{},
      },
      {
        headers: {
          Authorization: ROUTE_KEY,
          "Content-Type": "application/json"
        }
      }
    );
    
    const route = routeResponse.data.features[0]; //extracted response and below found the terms from respnse we want
  //tofixed means after point how many decimal num allowed. if 1 thenafter poit only 1 digit allowed, if 0 then none
    const distanceKm = (route.properties.summary.distance / 1000).toFixed(1); //extracted distance and / by 1000 for km

    const durationHour = (route.properties.summary.duration / 3600).toFixed(0); //extracted time and / by 60 for min

      const coords = route.geometry.coordinates; //all the coords defined

      //SECOND API USAGE
       //below is api for tourist stops to visit along the way 
      const mid_places_Points = []; //src and dest ke beech jitne bhi tourist spot aa rhe unko dhundhna and put in new array
      const samplePoints = 10; //ek set samplepoints rakho so that api calls does not go overboard
      const steps = Math.max(1, Math.floor(coords.length / samplePoints)); //same steps dhundho, how many times u want names of places

      for(let i = 0; i<coords.length; i+=steps){
        mid_places_Points.push(coords[i]); //new array mei saare coords ko daalo
      };

      let allFeatures = [];
      for(const points of mid_places_Points){ //loop chala diya taaki each coordinate ke around places could be found

    const placesResponse = await axios.get //taaki har ek midpoint ka nikal sake
    (`https://api.geoapify.com/v2/places?categories=tourism,natural&filter=circle:${points[0]},${points[1]},10000&bias=proximity:${points[0]},${points[1]}&limit=5&apiKey=${PLACES_KEY}`,);

    allFeatures.push(...placesResponse.data.features);
      }

    const duplicate = new Set(); //new set created to avoid duplicate names
    const stops = allFeatures
    .filter(place =>place.properties.name &&/^[A-Za-z0-9\s]+$/.test(place.properties.name)
  ) //to avoid blank names and to opt for only english words
    
    .filter(place=>{
      const id = place.properties.place_id;
      if(duplicate.has(id)){
        return false;
      }
      duplicate.add(id);
      return true;
    })
    .map(place=>({ //map means a new array has been formed with new data in it
      name: place.properties.name,
      lat: place.geometry.coordinates[1],
      long: place.geometry.coordinates[0]
    })).slice(0,5);

    //last step is forwarding all this back to frontend to be shown on card
    res.json({
      distance: distanceKm,
      duration: durationHour,
      coordinates: route.geometry.coordinates,
      stops,
      startLocation,
      endLocation,
      date,
      travellers,
    });
  } 
  catch (error) {
  console.log(error.message);
  res.status(500).json({ error: "Route API failed" });
}
});

//-----------------------------------------------------------------------------------//

//RESTSOPS CARD API STARTING FROM HERE
app.post("/restStops", LoggedIn, async(req,res)=>{
   try {
    const { coordinates, duration} = req.body;

    console.log("Coordinates", coordinates);
    console.log("Duration:", duration);

    const eateries_midPoint = [];
    const totalSteps = 6;
    const coord = Math.max(1,Math.floor(coordinates.length/totalSteps));
    for(let i = 0; i<coordinates.length; i+=coord){
      eateries_midPoint.push(coordinates[i]);
    }
    
    const finalCollection = [];
    for(const points of eateries_midPoint){
    const reststopResponse = await axios.get(`https://api.geoapify.com/v2/places?categories=catering.cafe,catering.fast_food,catering.restaurant&filter=circle:${points[0]},${points[1]},10000&bias=proximity:${points[0]},${points[1]}&limit=8&apiKey=${PLACES_KEY}`,);
    finalCollection.push(...reststopResponse.data.features);
    }
    const durationNumber = Number(duration);
    let maxStops;
    if(durationNumber<4){
      maxStops=2;
    }
    else if(durationNumber<8){
      maxStops=4;
    }
    else{
      maxStops=6;
    }
    const duplicate = new Set();
    const eateries_stop = finalCollection
    .filter(eatery=>eatery.properties.name &&/^[A-Za-z0-9\s]+$/.test(eatery.properties.name))
    
    .filter(eatery=>{const id = eatery.properties.place_id
    if(duplicate.has(id)){
      return false;
    }
    duplicate.add(id);
    return true;
  })
  .map(eatery=>({
    name: eatery.properties.name,
    address: `${eatery.properties.address_line1 || ""}, ${eatery.properties.city || ""}`,
    city: eatery.properties.city
  })).slice(0,maxStops);

  for (let i = 0; i < eateries_stop.length; i++) {
  try {
    const photoResponse = await axios.get(
      "https://api.pexels.com/v1/search",
      {
        params: {
          query: eateries_stop[i].name + " restaurant",
          per_page: 1
        },
        headers: {
          Authorization: PHOTOS_KEY
        }
      }
    );
    const imagePic = photoResponse.data.photos[0]?.src?.medium || "https://via.placeholder.com/400x300";
    eateries_stop[i].image = imagePic;
    
  } catch (error) {
    eateries_stop[i].image = "https://via.placeholder.com/400x300";
  }
}
  res.json({
    eateries_stop
  });

}
  catch(error){
    console.log(error.message);
    res.status(500).json({error: "Route API failed"});
  }
})





//TRIP ADVICE AI CARD PART STARTING FROM HERE
app.post("/trip-advice", LoggedIn, async(req,res)=>{
  try{
    const { start,end,time,date,travellers,stayDay,budget,mood } = req.body;

    const adviceResponse = await axios.post(`https://api.groq.com/openai/v1/chat/completions`, 
    {
      model:"llama-3.3-70b-versatile",
      messages: [
      {
        role: "system",
        content: `You are an expert travel planner who creates highly practical and detailed road trip itineraries.

Guidelines:
- This is STRICTLY a road trip. Do NOT suggest flights, trains, or air travel under any condition.
- The user will travel by road only.

- Create a day-wise itinerary based on number of stay days.
- Focus primarily on the DESTINATION city.
- Only Day 1 may include travel from start to destination (briefly).
- Remaining days must focus on exploring the destination and nearby places (within ~50–100 km).

CRITICAL:
- You MUST generate EXACTLY the number of days provided in StayDay.
- If StayDay is 8, output MUST contain day1 to day8.
- Do NOT generate fewer or more days.
- If incomplete, regenerate until all days are included.

- Each day should follow a natural flow: morning → afternoon → evening → night.

- Be VERY SPECIFIC:
  - Mention exact places (e.g., "Baga Beach", not "a beach")
  - Mention specific food spots or types (e.g., "beach shacks at Anjuna", "local seafood thali restaurants")
  - Mention areas/markets (e.g., "Mapusa Market", "Fontainhas Latin Quarter")

- Avoid vague phrases like:
  - "visit a beach"
  - "explore local market"
  - "have lunch somewhere"

- Instead, give clear, realistic suggestions.

- Group nearby places together logically.

Mood Handling:
- Use the user's mood to influence the type of activities.
- Do NOT explicitly mention the mood in the response.

Mood Mapping:
- adventurous → trekking, water sports, viewpoints, offbeat spots
- comforting → cafes, scenic places, relaxed walks, local markets
- spiritual → temples, peaceful ghats, cultural spots
- fun → nightlife, crowded markets, street food, activities
- restorative → beaches, nature, quiet places, slow-paced days

Writing Style:
- Write like a friend guiding the trip (natural and smooth).
- Each item should be 1–2 meaningful sentences.
- Each day should have 3–5 such steps.

IMPORTANT:
- Do NOT include other cities unless very close to destination.
- Do NOT turn this into a multi-city journey.

Output format:
Return ONLY valid JSON.

Format:
{
  "day1": ["step1","step2","step3","step4"],
  "day2": ["step1","step2","step3","step4"]
}

Rules:
- Number of days MUST match StayDay exactly.
- No extra text outside JSON.
- If output is not valid JSON, regenerate until it is valid.`
          },
          {
            role: "user",
            content: `Create a ${stayDay}-day road trip itinerary. The user will travel from ${start} to ${end}, but the plan should mainly cover what to do in ${end}.

Start: ${start}
Destination: ${end}
Travel Time: ${time}
Date: ${date}
Travellers: ${travellers}
Budget: ${budget}
Mood: ${mood}

Return ONLY JSON.`,
      }, //upar wale line mein ai gives text but we want it in json form its not mandatory because obv backend can 
      // give in json, but to prevent unnecessary lines of text we wrote this
    ],
    },
    {
      headers:{
        Authorization: `Bearer ${GROQ_KEY}`
      }
    }
  );
  const aiText = adviceResponse.data.choices[0].message.content; //humne extract kiya from response
  let cleanText = aiText
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

const aiJSON = JSON.parse(cleanText);

    res.json({
      adviceResponse: aiJSON
    });
  }

  catch(error){
    console.log(error.message);
    res.status(500).json({error: "Route API failed "});
  }
})








//FAMOUS PLACES TO VISIT API INTEGRATION STATING FROM HERE
app.post("/places", LoggedIn, async (req, res) => {

  try {

    const { destination_lng, destination_lat, mood } = req.body;
     console.log("Received:", destination_lng, destination_lat, mood);

    let categories="tourism.sights,natural.water,natural.peak";

    if (mood === "adventurous") {
      categories = "tourism.viewpoint,natural.peak,natural.water";
    }
    else if (mood === "comforting") {
      categories = "leisure.park,tourism.sights";
    }
    else if (mood === "spiritual") {
      categories = "religion.place_of_worship";
    }
    else if (mood === "fun") {
      categories = "entertainment,entertainment.theme_park";
    }
    else if (mood === "restorative") {
      categories = "tourism.sights,natural.water,natural.peak";
    }

    const placesResponse = await axios.get(
      `https://api.geoapify.com/v2/places?categories=${categories}&filter=circle:${destination_lng},${destination_lat},50000&bias=proximity:${destination_lng},${destination_lat}&limit=8&apiKey=${PLACES_KEY}`
    );
    console.log("Geoapify returned:", placesResponse.data.features.length);

    let places = placesResponse.data.features; //places extract kiya from features in geoplify api

    for (let i = 0; i < places.length; i++) {

      try {

        const placeName = places[i]?.properties?.name;

        if (!placeName) {
          places[i].image = "https://via.placeholder.com/400x300";
          continue;
        }

        const photoResponse = await axios.get(
          "https://api.pexels.com/v1/search",
          {
            params: {
              query: placeName + " tourist attraction",
              per_page: 1
            },
            headers: {
              Authorization: PHOTOS_KEY
            }
          }
        );

        const imagePic =
          photoResponse.data.photos[0]?.src?.medium ||
          "https://via.placeholder.com/400x300";

        places[i].image = imagePic;

      } catch (error) {

        places[i].image = "https://via.placeholder.com/400x300";

      }

    }

    const cleanPlaces = places
  .filter(place => place?.properties?.name)
  .map(place => ({
    name: place.properties.name,
    address: place.properties.formatted,
    image: place.image
  }));

  console.log("Places sent:", cleanPlaces);
    res.json({ places: cleanPlaces });

  } 
  catch (error) {

  console.log("Places API ERROR:", error.response?.data || error.message);

  res.status(500).json({ error: "Places API failed" });

}

});







// THE LAST API BEING USED THAT IS CAUTION AI CARD
app.post("/cautionAdvice", LoggedIn, async(req,res)=>{
  try{
    const { startLoc, endLoc, duration, distance, time, preferences } = req.body;

    const cautionResponse = await axios.post(`https://api.groq.com/openai/v1/chat/completions`, 
    {
      model:"llama-3.3-70b-versatile",
      messages: [
      {
        role: "system",
        content: `CRITICAL:
- Do NOT comment on whether data is correct or incorrect.
- Do NOT mention unrealistic values.
- Assume all inputs are valid and generate practical advice.

- Give VERY SPECIFIC real-world cautions:
  ❌ "be careful while driving"
  ✅ "Petrol pumps are sparse after 9 PM on highways like this, refuel before crossing city limits"

- Use input data smartly:
  - If duration > 6 hours → mention fatigue, fuel planning
  - If departure time is late → mention night driving risks
  - If early morning → mention fog / low visibility
  - If "Avoid Highways" → mention narrow roads / slower speed
  - If "Shortest" → mention village roads / poor conditions
  - If "Fastest" → mention tolls / traffic congestion

- Keep each point practical and actionable.
- Max 7-8 points only.`
          },
          {
            role: "user",
            content: `

Start: ${startLoc},
End: ${endLoc}
Duration: ${duration} hours
Distance: ${distance} km
Departure: ${time}
Preferences: ${preferences}

- Return STRICT JSON in this format:
{
  "risks": ["point1", "point2", "point3"]
}`,
      }, //upar wale line mein ai gives text but we want it in json form its not mandatory because obv backend can 
      // give in json, but to prevent unnecessary lines of text we wrote this
    ],
    },
    {
      headers:{
        Authorization: `Bearer ${GROQ_KEY}`
      }
    }
  );
  const aiText = cautionResponse.data.choices[0].message.content; //humne extract kiya from response
  let cleanText = aiText
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

const aiJSON = JSON.parse(cleanText);

    res.json({
      cautionResponse: aiJSON 
    });
  }

  catch(error){
    console.log(error.message);
    res.status(500).json({error: "Route API failed"});
  }
})





// login,signup integration
app.post("/signup",async (req,res)=>{
    const { username, email, password } = req.body;
    if(!username || !email || !password ){ //making sure that no field left empty by user
        return res.status(400).json({message:"All fields required"});
    }
    //in below code we r making sure that no user with same email,username gets signup more than once
   try{
    const existence = await User.findOne({ email });
    if(existence){
        return res.status(400).json({message:"User already exists"});
    }
   const hashedPassword = await bcrypt.hash(password,10); //10 means saltrounds, higher the number higher the security

   const newUser = new User({ 
    username,
    email,
    password: hashedPassword
});
   await newUser.save();
   return res.json({ message: "Signup successful" });
   }
   catch{
    res.status(500).json({ message: "Server error" });
   }
});


app.post("/login",async (req,res)=>{
    const { email,password } = req.body;
    if(!email || !password ){
        return res.status(400).json({message:"All fields are required"});
    }
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"User does not exist"});
        }
         const match = await bcrypt.compare(password, user.password);
         if(!match){
            return res.status(400).json({message:"Invalid credentials"});
         }
         else{
            //if password got approved during login, then jwt will create token for that user, will send back to frontend 
            //,jwt will help use remain logged in and the whole structure remains protected
            const token = jwt.sign({ id: user._id, email: user.email }, secret, {expiresIn: '1d'});
            //after token is created, we will give that token to cookies so that cookies could run throughout the 
            // server i.e user if add in cart or shop wont hv to repeatedly login
            res.cookie //jwt token given to cookie to store
            ("token", //name
            token, //token value called
            {httpOnly:true,
                sameSite:"none",
                secure:true});
            return res.json({message:"Login successful"});
         }
    }
    catch(error){
        return res.status(500).json({message:"Server error"});
    }
});

app.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "none",
    secure: true
  });

  res.json({ message: "Logged out" });
}); 

app.get("/check-auth", async(req,res)=>{
  const token = req.cookies.token;

  if(!token){
    return res.json({loggedIn: false})
  };
  try{
    jwt.verify(token, secret);
    return res.json({loggedIn: true})
  }
  catch{
    return res.json({loggedIn:false});
  }
})






const PORT = process.env.PORT || 5000; //both frontend and backend are on diff ports because frontend react uses vite and backend express 
// user its own node js server, each server require its own port
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});


