//this file acts as gatekeeper, so that if user direclt types /places on website without gettig loggedin,
//  middleware will prevent that

import jwt from 'jsonwebtoken';

export const LoggedIn = (req,res,next)=>{
    const token = req.cookies.token; //the frontend is sending its token and we r accessing here in this file
    if(!token){
        return res.status(401).json({message:"No token, access denied"});
    }
    try{
        const verification = jwt.verify(token,process.env.JWT_SECRET);
        next();
    }
    catch{
        return res.status(401).json({message:"Invalid token"});
    }
}