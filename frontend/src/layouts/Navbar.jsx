import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CrueltyFreeOutlinedIcon from '@mui/icons-material/CrueltyFreeOutlined';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useSnackbar } from '../context/alert';

export default function Navbar() {

// You open /login
// Navbar runs → isAuth = false
// You login → cookie set ✅
// You navigate to /centrePage
// 🔁 location changes
// useEffect runs AGAIN
// /check-auth returns true
// setisAuth(true)
// Navbar re-renders → shows Logout ✅

    const location = useLocation(); //useLocation is a hook from React Router that gives you info about the current URL (route).
    const navigate = useNavigate();
    const { showSnackbar } = useSnackbar();

    const [isauth, setisAuth ] = useState(false);

    //below we are callin to check if token for getting to log in exist or not
    useEffect(()=>{
      fetch("/api/check-auth",{
        credentials: "include"
    })
    .then(res=>res.json()) 
    .then(data=> 
    {setisAuth(data.loggedIn); //yaha par auth true ho jaega
    });
    },[location]);


    //calling the logout api
    const handleChange = async()=>{
      await axios("/api/logout",{
        method:"POST",
        withCredentials: true 
      });
      setisAuth(false); //logged off 
      showSnackbar("You have been logged out successfully 😇", "success");
      navigate("/centrePage");
    }

  return (
    <Box sx={{ background:"rgba(240,248,255,0.35)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderRadius: "20px",
    border: "1px solid rgba(255, 255, 255, 0.5)",
    boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
    padding: 3,
    flex:1
    }}>
      <AppBar position="static" sx={{ background: "transparent", boxShadow:"none"}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "black" }}>
            <CrueltyFreeOutlinedIcon/>  <b>RouteWise</b>
          </Typography>
          <Button onClick={()=>navigate("/centrePage")} sx={{ color: "black" }}><b>Main Page</b></Button>
         {
          isauth? (
            <Button onClick={handleChange} sx={{ color: "black" }}><b>Logout</b></Button>
          ):(
          <Button onClick={()=>navigate("/login")} sx={{ color: "black" }}><b>Login</b></Button>
          )
        }
        </Toolbar>
      </AppBar>
    </Box>
  );
}

