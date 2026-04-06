import './ResultPage.css';
import MapCard from "../components/mainCards/MapCard";
import RiskCard from "../components/mainCards/RiskCard";
import RestStopsCard from "../components/mainCards/ReststopsCard";
import TravelTipsCard from "../components/mainCards/TraveltipsCard";
import PlacesCard from "../components/mainCards/PlacesCard";
import { useLocation } from 'react-router-dom';//2nd hook is used here, so that data from front of the cards could be 
// transferred to backend
// ResultPage is the bridge between frontend and backend.
// Its job is:
// Take user input (start, end, preferences etc.)
// Send it to backend (/trip)
// Receive route data
// Store it in state (routeResponse)
// Pass that data to cards

function ResultPage() {
  
  const receivingData = useLocation();
  const { tripData, restData, adviceData, placesData, cautionData } = receivingData.state || {};

  //below line we basically extract data from frontend
  //const { startLocation, endLocation, date, time, travellers, stayDay, budget, mood,preferences } = receivingData.state || {};
  //below we gather taken data and put it under one object tripDetails to send to backend
  // const tripDetails = {
  //   startLocation,
  //   endLocation,
  //   date,
  //   time,
  //   travellers,
  //   stayDay,
  //   budget,
  //   mood,
  //   preferences
  // };
  //pehle respose is null then later on backend ka response usme aaega in setrouteresponse
    // const [routeResponse, setrouteResponse] = useState(null);

  //below code is for connection between frontend and backend so that api's could work
  // useEffect(() => { //runs only once when resultpage loads
    //below code basically says iss backend wali link par jakar from frontend trip details post kardo
    // if(!startLocation || !endLocation){
    //   return;
    // }
    // fetch("http://localhost:5000/trip", { //calls backend
      //below 3 lines sends data to backend
      // method: "POST",
      // headers: {
      //   "Content-Type": "application/json" //json ki form mein daal rhe
     // },
      //body: JSON.stringify(tripDetails) //converted into json, json is used because tripdetails is object
    //})
    //then backend responds it got the data
      // .then(res => res.json()) //receiving data from backend, and convert json to js object
      // .then(data => {
      //   console.log("Backend response:", data);
      //   setrouteResponse(data);//jo api se aaya response usko setroueresponse mei daal diya
  //     });
  // }, [startLocation,endLocation]);//run again only if either of them changes
  if (!tripData) {
    return (
      <div className="result">
        <h2>⚠️ No data found. Please generate your trip again.</h2>
      </div>
    );
  }

  const fullTripDetails = {
    ...tripData,
    places: placesData?.places,
    eateries_stop: restData?.eateries_stop,
    adviceResponse: adviceData?.adviceResponse,
    cautionResponse: cautionData?.cautionResponse
  };

  return (
    <div className="result">
      {/* passing data to all cards in form of props */}

      <MapCard tripDetails={fullTripDetails}/> 
      <RestStopsCard tripDetails={fullTripDetails}/>
      <TravelTipsCard tripDetails={fullTripDetails}/> 
      <PlacesCard tripDetails={fullTripDetails}/> 
      <RiskCard tripDetails={fullTripDetails}/>
    </div>
  );
}

export default ResultPage;