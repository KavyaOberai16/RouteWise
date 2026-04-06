import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from '../context/alert';
import './CentrePage.css';

export default function CentrePage() {
    {
        const navigate = useNavigate();
        const { showSnackbar } = useSnackbar();
    
  return ( 

    <div className='content'>
    <div className="heading">
        <Typography variant="h3" component="div">
            <b>Plan Your Next Journey</b>
          </Typography>
          <Typography variant="h5" sx={{ color: 'text.secondary' }}>
            <b>Find the best routes and destinations for your trip</b>
          </Typography>
        <Button 
          variant="contained" 
          size="large"
          onClick={()=>{
            fetch("http://localhost:5000/check-auth",{
              credentials: "include"
            })
            .then(res=>res.json())
            .then(data=>{
               console.log("Auth check:", data);
              if(!data.loggedIn){
                showSnackbar("You have to login first 😄", "success");
                navigate("/login");
              }
              else{
                navigate("/");
              }
            })
          }}
        >  Get Started </Button>
        </div>

        <div className="cardsContainer">
    <Card sx={{
    background:"rgba(240,248,255,0.15)",
    backdropFilter: "blur(25px)",
    WebkitBackdropFilter: "blur(25px)",
    borderRadius: "20px",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
    padding: 3
  }}>
      <CardActionArea>    
        <CardContent sx={{ 
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 1
  }}>
          <Typography variant="h5" component="div">
            📍
          </Typography>
          <Typography variant="h5" component="div">
            <b>Explore Routes</b>
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            <b>Discover optimal routes and helpful stops along the way</b>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    <Card sx={{
    background:"rgba(240,248,255,0.35)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderRadius: "20px",
    border: "1px solid rgba(255, 255, 255, 0.5)",
    boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
    padding: 3
  }}>

      <CardActionArea>
        <CardContent sx={{ 
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 1
  }}>
          <Typography variant="h5" component="div">
            🍴
          </Typography>
          <Typography variant="h5" component="div">
            <b>Find Restaurants</b>
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            <b>Locate great places to eat during your journey</b>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>

    <Card sx={{
    background:"rgba(240,248,255,0.35)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderRadius: "20px",
    border: "1px solid rgba(255, 255, 255, 0.5)",
    boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
    padding: 3
  }}>
      <CardActionArea>
        <CardContent sx={{ 
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 1
  }}>
           <Typography variant="h5" component="div">
            💡
          </Typography>
          <Typography variant="h5" component="div">
            <b>Travel Tips</b>
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            <b>Get useful tips to make your trip smooth and enjoyable</b>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </div>
    </div>
  );
}
}


