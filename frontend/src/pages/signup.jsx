import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import './signup.css';
import { useSnackbar } from '../context/alert';
import axios from 'axios';


export default function SignUpCard({username,email,password,setsignup}) {
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const handleSignup = async () => {
    console.log("Sending:", username, email, password);
  try {
    await axios.post("https://routewise-7b7p.onrender.com/signup", {
      username,
      email,
      password
    }, { withCredentials: true });
    //even after signing up, it was still rendering to /login page because the / page is protected and allows only loggedin ones 
//so after signing up it renders to / page, we again make the login part go ok with credentials 
   await axios.post("https://routewise-7b7p.onrender.com/login", {
  email,
  password 
}, { withCredentials: true });

// ✅ CHECK AUTH BEFORE NAVIGATING
const res = await fetch(
  "https://routewise-7b7p.onrender.com/check-auth",
  {
    credentials: "include"
  }
);

const data = await res.json();

if (data.loggedIn) {
  showSnackbar("You have been successfully registered 🎉", "success");
  navigate("/");
} else {
  showSnackbar("Login failed after signup 😣", "error");
}

  } catch {
    showSnackbar("Failed to register 😣", "error");
  }
};

  return (
    <div className="signupCard">
           <Typography variant="h5" className="heading">
                <b>Signup Form</b>
              </Typography>
    <Card className='form' sx={{
      background:"rgba(240,248,255,0.35)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      borderRadius: "20px",
      border: "1px solid rgba(255, 255, 255, 0.5)",
      boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
      padding: 3
    }}> 

      <CardContent>
        <Typography variant="h5"><b>Enter Your Name</b></Typography>
        <TextField
          label="name"
          value={username}
          onChange={(event)=>{
            const input = event.target.value;
            const formatted = input.charAt(0).toUpperCase() + input.slice(1);
            setsignup(prev => ({ ...prev, username: formatted }));
          }}
          fullWidth
        />

        <Typography variant="h5"><b>Enter Your Email</b></Typography>
        <TextField
          label="email"
          value={email}
          onChange={(event)=>{
            setsignup(prev => ({ ...prev, email: event.target.value }));
          }}
          fullWidth
        />

        <Typography variant="h5"><b>Enter Your Password</b></Typography>
        <TextField
          label="password"
          type="password"
          value={password}
          onChange={(event)=>{
            setsignup(prev => ({ ...prev, password: event.target.value }));
          }}
          fullWidth
        />
      </CardContent>

      <CardActions>
        <Button className='btn' size="large" variant="contained" onClick={handleSignup}>
          Sign Up
        </Button>
      </CardActions>

    </Card>
    </div>
  );
}