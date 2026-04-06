import './AllCard.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import { useState } from 'react';


export default function CardFour({onNext, preferences, setFourthCard}) {

  const [errors, setErrors ] = useState({preferences:false});

  const change = ()=>{
    const preferencesError = !preferences || preferences.length === 0;

    setErrors({
      preferences: preferencesError
    })
    if(!preferencesError){
      onNext();
    }
  }

  const handleChange = (event,newPreferences)=>{ //since we r using toggle like the other cards we wrote we didnt do 
  // it like that because in other cards it ws single input here there are multiple input which will switch
    setFourthCard(newPreferences);
  }
  
  return (
    <div className='startCard'>
    <Card className='cardFour'sx={{
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
          ✍<b>Any Trip Preferences?</b>
        </Typography>
         <FormControl error={errors.preferences}>
        <ToggleButtonGroup className='toggleGroup' color="primary" 
        value={preferences} onChange={handleChange} aria-label="Platform" exclusive={false}
        >
      <ToggleButton className="toggle" value="Toll-free">Avoid toll roads</ToggleButton>
      <ToggleButton className="toggle" value="Avoid-Highways">Avoid-Highways</ToggleButton>
      <ToggleButton className="toggle" value="Fastest">Fastest route</ToggleButton>
      <ToggleButton className="toggle" value="Shortest">Shortest route</ToggleButton>
    </ToggleButtonGroup>
      {errors.preferences && (
        <FormHelperText  sx={{ textAlign: "center" }}>Please Choose a Valid Option</FormHelperText>
        )}
        </FormControl>
      </CardContent>

      <CardActions>
        <Button size="large" variant='contained' onClick={change}>Next</Button>
      </CardActions>
    </Card>
    </div>
  );
}
