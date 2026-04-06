import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';

export default function CardThree({onNext,budget,mood,restAreas,setThirdCard}) {

  const [errors, setErrors ] = useState({money:false,emotion:false,rest:false});

  const handleChange = ()=>{
    const moneyError = budget === "";
    const emotionError = mood === "";
    const restError = restAreas === "";

    setErrors({
      money: moneyError,
      emotion: emotionError,
      rest: restError
    })
    if(!moneyError && !emotionError && !restError){
      onNext();
    }
  }

  return (
    <div className='startCard'>
    <Card className='cardThree'sx={{
    background:"rgba(240,248,255,0.35)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderRadius: "20px",
    border: "1px solid rgba(255, 255, 255, 0.5)",
    boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
    padding: 3
  }}>

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          💰 <b>Budget Range?</b>
        </Typography>
        <FormControl error={errors.money} sx={{ alignItems: "center" }}>
        <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={budget}
        onChange={(event)=>{
          setThirdCard((prev)=>({
            ...prev,
            budget: event.target.value
          }))
        }}>
          
        <FormControlLabel value="low" control={<Radio />} label="Low" />
        <FormControlLabel value="medium" control={<Radio />} label="Medium" />
        <FormControlLabel value="high" control={<Radio />} label="High" />
      </RadioGroup>
      {errors.money && (
    <FormHelperText>Please Choose a Valid Option</FormHelperText>
    )}
    </FormControl>
        
        <Typography gutterBottom variant="h5" component="div">
          🧳 <b> Travel Style? </b>
        </Typography>
        <FormControl error={errors.emotion} sx={{ alignItems: "center" }}>
        <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={mood}
        onChange={(event)=>{
          setThirdCard((prev)=>({
            ...prev,
            mood: event.target.value
          }))
        }}
      >
        <FormControlLabel value="adventurous" control={<Radio />} label="Adventurous" />
        <FormControlLabel value="comforting" control={<Radio />} label="Comforting" />
        <FormControlLabel value="spritual" control={<Radio />} label="Spiritual" />
        <FormControlLabel value="fun" control={<Radio />} label="Fun" />
        <FormControlLabel value="restorative" control={<Radio />} label="Restorative" />
      </RadioGroup>
      {errors.emotion && (
    <FormHelperText>Please Choose a Valid Option</FormHelperText>
    )}
    </FormControl>

      <Typography gutterBottom variant="h5" component="div">
          🛑 <b>Peferred rest stops?</b>
        </Typography>
        <FormControl error={errors.rest} sx={{ alignItems: "center" }}>
        <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={restAreas}
        onChange={(event)=>{
          setThirdCard((prev)=>({
            ...prev,
            restAreas: event.target.value
          }))
        }}
      >
        <FormControlLabel value="restaurants" control={<Radio />} label="Restaurants" />
        <FormControlLabel value="cafes" control={<Radio />} label="Cafes" />
        <FormControlLabel value="fast-food" control={<Radio />} label="Fast-Food" />
      </RadioGroup>
      {errors.rest && (
    <FormHelperText>Please Choose a Valid Option</FormHelperText>
    )}
    </FormControl>
 
      </CardContent>

      <CardActions>
        <Button size="large" variant='contained' onClick={handleChange}>Next</Button>
      </CardActions>
    </Card>
    </div>
  );
}
