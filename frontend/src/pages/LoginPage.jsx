import { useState } from 'react';
import LoginCard from './login';

function LoginPage(){
    
    const [login,setlogin] = useState({email:"",password:""});

    return(
        <>
        <LoginCard
        email={login.email}
        password={login.password}
        setlogin={setlogin}
        />
        </> 
    )
}

export default LoginPage;