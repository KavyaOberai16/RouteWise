import { useState } from 'react';
import SignUpCard from './signup';

function SignupPage(){
    
    const [signup,setsignup ] = useState({username:"",email:"",password:""});

    return(
        <>
        <SignUpCard 
        username={signup.username}
        email={signup.email}
        password={signup.password}
        setsignup={setsignup}
        />
        </> 
    )
}

export default SignupPage;