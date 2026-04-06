import './PlacesCard.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
// import { useState } from 'react';
// import { useEffect } from 'react';

export default function PlacesCard({tripDetails}) {

//   const [places,setPlaces] = useState([]);
//   const destinationCoordinates = tripDetails?.coordinates?.[tripDetails?.coordinates?.length - 1];
//   const destination_lng = destinationCoordinates?.[0];
//   const destination_lat = destinationCoordinates?.[1];

//   useEffect(()=>{
//     if(!tripDetails || destination_lng === undefined || destination_lat === undefined){
//     return;
// }
//     fetch("http://localhost:5000/places",{
//       method: "POST",
//       headers:{
//         "content-type": "application/json"
//       },
//       credentials: "include",
//       body: JSON.stringify({
//         destination_lng,
//         destination_lat,
//         mood
//       }) 
//     })
//     .then(res=>res.json())
//     .then(data=>{
//       console.log("Backend response is:", data);
//       setPlaces(data.places);
//     })
//   },[tripDetails, destination_lng, destination_lat, mood]);
  const places = tripDetails?.places;
  if(!places){
    return <p>No places found</p>
  } 

  return (
    <div className="visitSection">
       <Typography variant="h5" className="sectionHeading">
            <b>Iconic places you must visit</b>
          </Typography>
    <div className="fifthCard">
      {places.map((place, index) => (
    <Card key={index} className='placeCard' 
    sx={{background:"rgba(240,248,255,0.35)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderRadius: "20px",
    border: "1px solid rgba(255, 255, 255, 0.5)",
    boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
    padding: 3}}>
      <CardActionArea>
        <CardContent>
  <div>
    <img src={place.image} alt={place.name} width="200"/>
    <h3>{place.name}</h3>
    <p>{place.address}</p>
  </div>
        </CardContent>
      </CardActionArea>
    </Card>
    ))} 
    </div>
    </div>
  );
}
