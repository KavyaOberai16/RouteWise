import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useState } from 'react';


export default function CardTwo({onNext,date,time,travellers,stayDay,setSecondCard}) {

  const [errors, setErrors ] = useState({calender:false,watch:false,people:false,stay:false});
  const handleChange = ()=>{
    const calenderError = date === "";
    const watchError = time === "";
    const peopleError = travellers <= 0;
    const stayError = stayDay <= 0;

    setErrors({
      calender: calenderError,
      watch: watchError,
      people: peopleError,
      stay: stayError 
    })
    if(!calenderError && !watchError && !peopleError && !stayError){
      onNext();
    }
  }
  return (
    <div className='startCard'>
    <Card className='cardTwo'
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
        <Typography variant="h5" component="div">
          📅 <b>Select Travel Date</b>
        </Typography>
        <TextField label="Date" value={date} 
        error= {errors.calender} 
        helperText={errors.calender? "Please Enter Valid Details":""} type= "date"
        onChange={(event)=>{
          setSecondCard((prev)=>({
            ...prev,
            date: event.target.value
          }))
        }}
        InputLabelProps={{ shrink: true }} //basically mui overlap kar deta hai isnide th box where user writes, 
        // so to avoid it we use this
         fullWidth/>

        <Typography variant="h5" component="div">
          ⌚ <b>Select Departure Time</b>
        </Typography>
        <TextField label="Time" value={time} 
        error={errors.watch}
        helperText={errors.watch ? "Please Enter Valid Details": ""}
        type='time'
        onChange={(event)=>{
          setSecondCard((prev)=>({
            ...prev,
            time: event.target.value
          }))
        }}
        InputLabelProps={{ shrink: true }}
        fullWidth/>

        <Typography variant="h5" component="div">
          👨‍👨‍👧‍👧 <b>How Many Passengers</b>
        </Typography>
        <TextField label="Travellers" value={travellers} 
        error = {errors.people}
        helperText={errors.people? "Please Enter Valid Details": ""}
        type='number'
        onChange={(event)=>{
          const input = event.target.value;
          const updated = Math.max(1, input);
          setSecondCard((prev)=>({
            ...prev,
            travellers: updated
          }))
        }}
        variant="outlined" fullWidth/>
        
        <Typography variant="h5" component="div">
          🛌 <b>How long is your stay</b>
        </Typography>
        <TextField label="stay" value={stayDay} 
        error = {errors.stay}
        helperText={errors.stay? "Please Enter Valid Details":""}
        type='number'
        onChange={(event)=>{
          const input = event.target.value;
          const updated = Math.max(1, input);
          setSecondCard((prev)=>({
            ...prev,
            stayDay: updated
          }))
        }}
        variant="outlined" fullWidth/>
        
      </CardContent>

      <CardActions>
        <Button size="large" variant="contained" onClick={handleChange}>Next</Button>
      </CardActions>
    </Card>
    </div>
  );
}
