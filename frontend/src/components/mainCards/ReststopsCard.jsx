import './ReststopsCard.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
// import { useState } from 'react';
// import { useEffect } from 'react';

export default function RestStopsCard({tripDetails}) {  //tripdetails acquired from resulpage as props

  // const [restStops, setrestStops] = useState([]);

//   useEffect(()=>{
//     if(!tripDetails){
//       return;
//     }
//     fetch("http://localhost:5000/restStops",{
//       method:"POST",
//       headers: {
//         "Content-type": "application/json"
//       },
//       credentials: "include",
//       body: JSON.stringify({
         //after render in resultpage tripdetails contains backend data it also has duration coordinates that we asked in /trip route for mapcard data
         //these coordinates and all will be used for searching restaurants etc because now frontend has this data
//         coordinates: tripDetails?.coordinates?.slice(0,200),
//         duration: tripDetails.duration,
//       })
//     })
//     .then(res=>res.json())
//     .then(data=>{ 
//       console.log("restStops",data);
//       setrestStops(data.eateries_stop);//called
//     });
//   },[tripDetails]);
//  if (!tripDetails) return null;
  const restStops = tripDetails?.eateries_stop;
  if (!restStops) return <p>No rest stops found</p>;

   return (
    <div className="restSection">

    <Typography variant="h5" className="sectionHeading">
      <b>Rest stops en route</b>
    </Typography>

    <div className="thirdCard">
      {restStops.map((stop, index) => (
        <Card className='restCard' key={index} 
        sx={{background:"rgba(240,248,255,0.35)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderRadius: "20px",
    border: "1px solid rgba(255, 255, 255, 0.5)",
    boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
    padding: 3}}>
          {/* Image Section */}
          <CardMedia
            component="img"
            height="140"
            image={stop.image}
            alt={stop.image}
            title={stop.name}
          />

          {/* Content Section */}
          <CardContent>
            <Typography variant="h6" >
              <b>{stop.name}</b>
            </Typography>

            <Typography variant="body2">
              <b>City: {stop.city}</b>
            </Typography>

            <Typography variant="body2">
              <b>Location: {stop.address}</b>
            </Typography>

          </CardContent>
        </Card>
      ))}
    </div>
    </div>
  );
}
/*
IMPORTANT DATA FLOW REMINDER

1. When ResultPage first renders:
   routeResponse = null
   Because the backend request has not finished yet.

2. React renders all child components immediately,
   so RestStopsCard receives:
   tripDetails = null (at first).

3. After the /trip fetch finishes:
   setrouteResponse(data) is called.

4. React re-renders the component.

5. Now:
   routeResponse = actual backend data
   tripDetails (inside RestStopsCard) = actual data.

So:
Data is NOT available on first render.
It becomes available AFTER the fetch completes
and React re-renders.

Always check:
if (!tripDetails) return;
to prevent crashes.
*/