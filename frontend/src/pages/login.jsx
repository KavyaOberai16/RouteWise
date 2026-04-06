import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from '../context/alert';
import './login.css'
import axios from 'axios';

export default function LoginCard({email,password,setlogin}) {
  
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const handleLogin = async () => {
  try {
    const response = await axios.post(
      "http://localhost:5000/login",
      { email, password },
      { withCredentials: true } // VERY IMPORTANT (for cookies)
    );

    showSnackbar("Welcome Back 😊", "success");
    navigate("/");
  } catch (err) {
    showSnackbar("Login failed😶","error");
  }  
};

  return (
    <div className="loginCard">
           <Typography variant="h5" className="heading">
                <b>Login Form</b>
              </Typography>
    <Card className='form' sx={{ background:"rgba(240,248,255,0.35)",
    backdropFilter: "blur(20px)", 
    WebkitBackdropFilter: "blur(20px)",
    borderRadius: "20px",
    border: "1px solid rgba(255, 255, 255, 0.5)",
    boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
    padding: 3 }}>
      <CardContent>
       <Typography variant="h5"><b>Enter Your Email</b></Typography>
               <TextField
                 label="email"
                 value={email}
                 onChange={(event)=>{
                   setlogin(prev => 
                    ({ ...prev, 
                      email: event.target.value }));
                 }}
                 fullWidth
               />
       
               <Typography variant="h5"><b>Enter Your Password</b></Typography>
               <TextField
                 label="password"
                 type="password"
                 value={password}
                 onChange={(event)=>{
                   setlogin(prev => 
                    ({ ...prev, 
                      password: event.target.value }));
                 }}
                 fullWidth
               />
               <Typography sx={{ marginTop: 1 }}>
                 Not registered yet?{" "}
  <span style={{ color: "#11adf5", cursor: "pointer", fontWeight: "bold" }}
    onClick={() => navigate("/signup")}>
    Click here
  </span>
</Typography>
      </CardContent>
      <CardActions>
        <Button className='btn' onClick={handleLogin} size="large">Log In</Button>
      </CardActions>
    </Card>
    </div>
  );
}
