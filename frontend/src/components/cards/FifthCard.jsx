import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom'; //this react hook helps when we click btn and we want to navigate to next page
import { useState } from 'react';

export default function CardFive({
  //all the props of all cards has been embedded in the fourth card, no new state for fourth card has been made
  startLocation,endLocation,date,time,travellers,stayDay,budget,mood,restAreas,preferences,setStep})
  {
  
   const [loading,setLoading] = useState(false);
   const navigate = useNavigate();//created this function
   const handleChange = async () => {
  setLoading(true);

  // 👉 ADDED: go to loading page first
  navigate("/loading");

  try {
    // 1️⃣ CALL TRIP API
    const tripRes = await fetch("/trip", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        startLocation,
        endLocation,
        date,
        time,
        travellers,
        stayDay,
        budget,
        mood,
        preferences
      })
    });

    const tripData = await tripRes.json();

    if (!tripData || !tripData.coordinates || tripData.coordinates.length === 0) {
  console.log("Invalid trip data:", tripData);
  setLoading(false);
  return;
}

    // 2️⃣ PREPARE DATA FROM TRIP
    const lastCoord = tripData.coordinates[tripData.coordinates.length - 1];
    const limitedCoords = tripData.coordinates.slice(0, 50);

    // 3️⃣ CALL ALL OTHER APIs IN PARALLEL
    const [restData, adviceData, placesData, cautionData] = await Promise.all([

      // 🍽 REST STOPS
      fetch("/restStops", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          coordinates: limitedCoords,
          duration: tripData.duration 
        })
      }).then(res => res.json()),

      // 🤖 TRIP ADVICE
      fetch("/trip-advice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          start: startLocation,
          end: endLocation,
          time,
          date,
          travellers,
          stayDay,
          budget,
          mood
        })
      }).then(res => res.json()),

      // 🗺 PLACES
      fetch("/places", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          destination_lng: lastCoord[0],
          destination_lat: lastCoord[1],
          mood
        })
      }).then(res => res.json()),

      // ⚠️ CAUTION
      fetch("/cautionAdvice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          startLoc: startLocation,
          endLoc: endLocation,
          duration: tripData.duration,
          distance: tripData.distance,
          time,
          preferences
        })
      }).then(res => res.json())

    ]);

    // 4️⃣ NAVIGATE WITH ALL DATA
    navigate("/result", {
      state: {
        tripData,
        restData,
        adviceData,
        placesData,
        cautionData
      }
    });

  } catch (error) {
  console.log("Error:", error);
}finally {
  setLoading(false);
}
};

  
  const pageReturn=()=>{ //here is the function, which will be used in edit btn, so when user clicks he/she goes to card 1
            setStep(1);
          }
{
  return (
    <div className='startCard'>
      <h1>Confirmation Review</h1>

      <Card className='cardFive' sx={{
    background:"rgba(240,248,255,0.35)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderRadius: "20px",
    border: "1px solid rgba(255, 255, 255, 0.5)",
    boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
    padding: 3
  }}> 
        <CardContent>

          <div className="finalRow">
          <Typography variant="h6">📍 Start Location</Typography>
          <Typography color="text.secondary">{startLocation}</Typography>
          </div>

          <div className="finalRow">
          <Typography variant="h6" mt={2}>📍 End Location</Typography>
          <Typography color="text.secondary">{endLocation}</Typography>
          </div>

          <div className="finalRow">
          <Typography variant="h6" mt={2}>📅 Date of Departure</Typography>
          <Typography color="text.secondary">{date}</Typography>
          </div>

          <div className="finalRow">
          <Typography variant="h6" mt={2}>⏰ Time of Departure</Typography>
          <Typography color="text.secondary">{time}</Typography>
          </div>

          <div className="finalRow">
          <Typography variant="h6" mt={2}>👨‍👨‍👧‍👦 No. of Travellers</Typography>
          <Typography color="text.secondary">{travellers}</Typography>
          </div>

          <div className="finalRow">
          <Typography variant="h6" mt={2}>🛌 No. of Days of your stay</Typography>
          <Typography color="text.secondary">{stayDay}</Typography>
          </div>

          <div className="finalRow">
          <Typography variant="h6" mt={2}>💸 Budget</Typography>
          <Typography color="text.secondary">{budget}</Typography>
          </div>
          
          <div className="finalRow">
          <Typography variant="h6" mt={2}>⛅ Travel Style</Typography>
          <Typography color="text.secondary">{mood}</Typography>
          </div>

          <div className="finalRow">
          <Typography variant="h6" mt={2}>🍽 Rest Areas</Typography>
          <Typography color="text.secondary">{restAreas}</Typography>
          </div>

          <div className="finalRow">
          <Typography variant='h6' mt={2}>🧳 Trip Preference</Typography>
          <Typography color="text.secondary">{preferences}</Typography>
          </div>
          

        </CardContent>

        <CardActions>
          {/* pagereturn function being used */}
          <Button size="large" variant='contained' onClick={pageReturn}> Edit Details</Button>
          {/* the navigate fun being used below, same / route which was used in app.jsx */}
          <Button size="large" onClick={handleChange} //now onclick not only it will navigate to resultpage,
            // but also all data will go to resultpage
             variant="contained">
            Confirm & Generate Plan 
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};
};