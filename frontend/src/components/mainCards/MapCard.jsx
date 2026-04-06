import './MapCard.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { MapContainer, TileLayer, Polyline } from 'react-leaflet';
import { useMap } from 'react-leaflet';
import { Marker, Popup } from 'react-leaflet';
import { useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

export default function MapCard({tripDetails}) {
  if (!tripDetails || !tripDetails.coordinates) { 
    return <CircularProgress />; 
  }
  const { distance, duration, coordinates, startLocation, endLocation, date, travellers, stops} = tripDetails;

  //coordinates extracted from openrouteservice are already in the form of (long,lat), but leaflet use (lat,long) 
  // format so below we convert it
  const convertedCoordinates = [];
  for(let i = 0; i<coordinates.length;i++){
    const long = coordinates[i][0];
    const lat = coordinates[i][1];

    convertedCoordinates.push([lat,long]);
  }

  //and always remember this is how we implement hooks,, the function name starts with capital letter
  function MapShow({positions}){ //positions is props here 
    const map = useMap();

    useEffect(()=>{
      map.fitBounds(positions);
    },[positions]);
    return null; //here it is null because hook always renders and returns something but here since there is nothing therefore null
  }
  //till here

  return (
    <Card className='firstCard'
    sx={{background:"rgba(240,248,255,0.35)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderRadius: "20px",
    border: "1px solid rgba(255, 255, 255, 0.5)",
    boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
    padding: 3}} >
        {/* left side of the main card */}
      <div className="CardOne">
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div"> 
            <b>Route Overview</b> 
          </Typography>
        </CardContent>
      </CardActionArea>
{/* below code i hv acquired from npm i leaflet documentation and we hv putted center acc to the source location */}
  <MapContainer scrollWheelZoom={false} style={{height:"81%",width:"100%"}}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {/* for route line to be shown on map */}
    <Polyline positions={convertedCoordinates}></Polyline> 
    <MapShow positions={convertedCoordinates}></MapShow>
    {/* for showing the marked points */}
    <Marker position={convertedCoordinates[0]}>
      <Popup>Source</Popup>
    </Marker>
    <Marker position={convertedCoordinates[convertedCoordinates.length-1]}>
      <Popup>Destination</Popup>
    </Marker>

  </MapContainer>
    </div> 

    {/* right part of main card */}
    <div className="right">
      {/* right upper part of maincard */}
    <div className="CardTwo">
      <CardActionArea>
        <CardContent> 
          <Typography variant="h5" className='subTopic' component="div">
            <b>From {startLocation} to {endLocation}</b>
          </Typography>
        </CardContent>
      </CardActionArea>
    <div className="mainDesign">
    <div className="design">
    <b> 🚗 {distance} km</b>
    </div>
    <div className="design">
    <b> ⏳ {duration} hours</b>
    </div>
    </div>
    </div>

    {/* right bottom side of main card */}
    <div className="right-bottom">
    <div className="CardThree">
      <CardActionArea>
        <CardContent>
          <Typography className='subTopic' variant="h5" component="div">
            <b>Stops along the way</b>
          </Typography>
        </CardContent>
      </CardActionArea>
    <div className="mainDesignOne">
  {!stops || stops.length === 0 ? (
    <div className="design">
      <b>No Stops Found</b>
    </div>
  ) : (
    <ul className="designOne">
      {stops.map((place, index) => (
        <li key={index}>
          <b>{place.name}</b>
        </li>
      ))}
    </ul>
  )}
</div>
    </div>

    {/* right below part of main card */}
    <div className="CardFour">
      <CardActionArea>
        <CardContent>
          <Typography className='subTopic' variant="h5" component="div">
            <b>Date & Travelers</b>
          </Typography>
        </CardContent>
      </CardActionArea>
    <div className="mainDesignTwo">
    <div className="design">
    <b>📆 {date}</b>
    </div> 
    <div className="design">
    <b>👨‍👧‍👧 {travellers}</b>
    </div>
    </div>

    </div>
    </div>
    </div>
    </Card>
  );
}
