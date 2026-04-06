import './AllCard.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useState } from 'react';


export default function CardOne({onNext,startLocation,endLocation,setFirstCard}) {//these r all props from mainpage, so 
// that it perfoms its function
    //this card layout is from mui 
    //errors word is used in react
    //first we used usestate appoint them as false then we checked with btn if its empty or not, if empty then true 
    // otheriwse false thenin textfield if error is there then hsow red box
    const [errors, setErrors ] = useState({start:false,end:false}) //at first there is no error among both fields

    const handleChange = () => { //ek fun banaya which will be used for button
  const startError = startLocation.trim() === ""; //checking that after trimming is it empty or not, if empty then true
  const endError = endLocation.trim() === ""; //checking if after trimming is it empty or not

  setErrors({
    start: startError,
    end: endError
  });

  if (!startError && !endError) { //agar dono mei error nhi hain means agar dono false hai so we can move ahead
    onNext();
  }
};
  return (
    <div className='startCard'>
    <Card className='cardOne' 
    sx={{
    background:"rgba(240,248,255,0.35)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderRadius: "20px",
    border: "1px solid rgba(255, 255, 255, 0.5)",
    boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
    padding: 3
  }}>

      <CardContent>
        <Typography gutterBottom variant="h5" component="div" className='beginning'>
          📍 <b>Where are you starting from?</b>
        </Typography>
        <TextField 
        label="City/Place" 
        value= {startLocation} 
        error={errors.start} //inbuilt automatic red color box will appear 
        helperText={errors.start ? "Please Enter Valid Details" : ""}
        onChange ={(event)=>{
          //the below 2 lines of code is basically making sure that when a person types any city/place its first letter remains always capital for professional look
          const input = event.target.value;
          const formatted = input.charAt(0).toUpperCase() + input.slice(1);
          setFirstCard((prev)=>({ //React, give me the notebook
            //... means spread generally used if arrays or list of objects usestate hv been created
            ...prev, //Make a copy of everything
            startLocation: formatted //Change only the start location and save this new notebook
          }))
          if(input.trim()){
            setErrors((prev)=>({
              ...prev,
              start: false
            }))
          }
        }} 
        variant="outlined" 
        fullWidth/>

        <Typography gutterBottom variant="h5" component="div" className='beginning'>
          📍 <b>Where are you going?</b>
        </Typography>
        <TextField 
        label="City/Place" 
        value = {endLocation} 
        error={errors.end}
        helperText={errors.end ? "Please Enter Valids Details" : ""}
        onChange={(event)=>{
          const input = event.target.value;
//basically input.slice(1) kyu hai because if i wrote small vadodra, it will try to convert capital V and attach to 
// remainig word, after attaching it will be like this Vvadodra, so we need to remove index 1 letter
          const formatted = input.charAt(0).toUpperCase() + input.slice(1);
          setFirstCard((prev)=>({
            ...prev,
            endLocation: formatted
          }))
           if(input.trim()){
            setErrors((prev)=>({
              ...prev,
              end: false
            }))
          }
        }}
        variant="outlined" 
        fullWidth/>

      </CardContent>

      <CardActions>
        <Button size="large" variant = "contained" onClick={handleChange}>Next</Button>
      </CardActions>
    </Card>
    </div>
  );
}