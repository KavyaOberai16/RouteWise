import './RiskCard.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
// import { useState, useEffect } from 'react';

export default function RiskCard({tripDetails}) {


  // const [cautionAdvice, setcautionAdvice ] = useState(null);

  // useEffect(()=>{
  //   if(!tripDetails){
  //     return;
  //   }
  //   fetch("http://localhost:5000/cautionAdvice",{
  //     method:"POST",
  //     headers:{
  //       "content-type": "application/json"
  //     },
  //     credentials: "include",
  //     body: JSON.stringify({
  //       startLoc: tripDetails?.startLocation,
  //       endLoc: tripDetails?.endLocation,
  //       duration: tripDetails?.duration,
  //       distance: tripDetails?.distance,
  //       time: time,
  //       preferences: preferences?.join(",") || ""
  //     })
  //   })
  //   .then(res=>res.json())
  //   .then(data=>{
  //     console.log("cautionAdvice" ,data);
  //     setcautionAdvice(data.cautionResponse);
  //   });
  // },[tripDetails, time, preferences])
  // if(!tripDetails){
  //   return null;
  // }
  const cautionAdvice = tripDetails?.cautionResponse?.risks;

  if(!cautionAdvice){
    return <p>No advice found</p>
  }

  return (
     <div className="riskCard">
          <Typography className='sectionHeading' variant="h5" component="div">
           <b>Caution Along this route</b>
          </Typography>
    <Card className='secondCard'
    sx={{background:"rgba(240,248,255,0.35)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderRadius: "20px",
    border: "1px solid rgba(255, 255, 255, 0.5)",
    boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
    padding: 3}}>
      <CardActionArea>
        <CardContent>
          <ul>
            {cautionAdvice.map((item,index)=>(
              <li key={index}><b>{item}</b></li>
  ))}
          </ul>
        </CardContent>
      </CardActionArea>
    </Card>
    </div>
  ); 
} 
