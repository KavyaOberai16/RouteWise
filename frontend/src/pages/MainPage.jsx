import { useState } from "react";
import CardOne from "../components/cards/FirstCard";
import CardTwo from "../components/cards/SecondCard";
import CardThree from "../components/cards/ThirdCard";
import CardFour from "../components/cards/FourthCard";
import CardFive from "../components/cards/FifthCard";
//Holds all user input state, Controls step switching, Passes collected data to next stage and It does NOT talk to backend
//this file is handling all the front of the house cards from card 1-5
function MainPage (){
    //all hooks are generally written on top
    const [step, setStep] = useState(1);
    //pehle sab ko null initialise kardiya
    const [firstCard,setFirstCard] = useState({startLocation:"",endLocation:""});
    const [secondCard, setSecondCard] = useState({date:"",time:"",travellers:"",stayDay:""});
    const [thirdCard, setThirdCard] = useState({travel:"",budget:"",mood:"",restAreas:""});
    const [fourthCard, setFourthCard] = useState([]);
    
    return(
        <>
        {/* onNext is props which will be used in firstcard file, so that it can perform the functionality of 
        disappearing itself after btn click so that 2nd one could show */}
        {step == 1 && <CardOne 
        startLocation={firstCard.startLocation} //props creation
        endLocation={firstCard.endLocation} 
        setFirstCard={setFirstCard}
        onNext={()=>setStep(2)}/>}

        {step == 2 && <CardTwo 
        date={secondCard.date} //props creation
        time={secondCard.time}
        travellers={secondCard.travellers}
        stayDay = {secondCard.stayDay}
        setSecondCard={setSecondCard}
        onNext={()=>setStep(3)}/>}

        {step == 3 && <CardThree  //props creation
        budget={thirdCard.budget}
        mood={thirdCard.mood}
        restAreas={thirdCard.restAreas}
        setThirdCard={setThirdCard}
        onNext={()=>setStep(4)}/>}

        {step == 4 && <CardFour
        preferences={fourthCard} //we didnt wrote fourthcard.preferences because first of all it is an array, in usestate 
        // above no value is passed, the value by default is all tolls, food stops etc
        setFourthCard={setFourthCard}
        onNext={()=>setStep(5)}/>}

        {step == 5 && <CardFive
        //no new usestate will be created for fourthcard, because this card is for showing the info gathered
        //from all cards
        startLocation={firstCard.startLocation}
        endLocation={firstCard.endLocation}
        date={secondCard.date}
        time={secondCard.time}
        travellers={secondCard.travellers}
        stayDay={secondCard.stayDay}
        budget={thirdCard.budget}
        mood={thirdCard.mood}
        restAreas={thirdCard.restAreas}
        preferences={fourthCard}
        setStep={setStep}
        />}


        </>
    );
    
}

export default MainPage;