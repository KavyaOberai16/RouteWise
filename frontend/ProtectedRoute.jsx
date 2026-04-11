import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProtectedRoute({children}){
    
    const [Loading,setLoading] = useState(true);
    const [isAuth, setAuth ] = useState(false);

    useEffect(()=>{
        fetch("/check-auth",{
            method:"GET",
            credentials: "include"
            })
            .then(res=>res.json())
            .then(data=>{
                setAuth(data.loggedIn);
                setLoading(false);
            }
            )
    },[]);

    if(Loading){
        return <p>...Loading</p>
    }

    if(!isAuth){
        return <Navigate to="/login"/>
    }

    return children;
}