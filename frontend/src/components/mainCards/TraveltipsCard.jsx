import './TraveltipsCard.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
// import { useState } from 'react';
// import { useEffect } from 'react';

export default function TravelTipsCard({tripDetails}) {

  // const[advice, setAdvice ] = useState(null);

  // useEffect(()=>{
  //   if(!tripDetails){
  //     return;
  //   }
  //   fetch("http://localhost:5000/trip-advice",{
  //     method: "POST",
  //     headers:{
  //       "content-type" : "application/json"
  //     },
  //     credentials: "include",
  //     body: JSON.stringify({
  //       start: tripDetails?.startLocation,
  //       end: tripDetails?.endLocation,
  //       time: tripDetails?.time,
  //       date: tripDetails?.date,
  //       travellers: tripDetails?.travellers,
  //       stayDay: tripDetails?.stayDay,
  //       budget: tripDetails?.budget,
  //       mood: tripDetails?.mood
  //     })
  //   })
  //   .then(res=>res.json())
  //   .then(data=>{
  //     console.log("advice",data);
  //     setAdvice(data.adviceResponse); //called
  //   });
  // },[tripDetails])
  // if(!tripDetails){
  //   return null;
  // }
  const advice = tripDetails?.adviceResponse;
    if(!advice) {
      return <p>No advice found</p>
  }
  return (
    <div className="scheduleCard">
    <Typography className="sectionHeading" variant="h5">
            <b>Trip Itinerary</b>
          </Typography>
    <Card
      className='fourthCard'
      sx={{
        background: "rgba(240,248,255,0.35)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderRadius: "20px",
        border: "1px solid rgba(255, 255, 255, 0.5)",
        boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
        padding: 3
      }}
    >

      <CardActionArea>
        <CardContent>
          {/* object entries convert object to array, so [day1,[places,restaurants]] */}
          {Object.entries(advice).map(([day, items], index) => (
  <div key={index} className="dayBlock">

    <Typography variant="h6">
      <b>Day {index + 1}</b>
    </Typography>

    <ul>
      {items?.map((item, i) => (
        <li key={i}><b>{item}</b></li>
      ))}
    </ul>

  </div>
))}

        </CardContent>
      </CardActionArea>
    </Card>
    </div>
  );
}