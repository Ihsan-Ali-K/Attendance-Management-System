import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config()
const JWT = process.env.JWT;
export const verifyToken = (req, res, next) =>{
    
    const token = req.cookies.access_token;
    if(!token) return res.status(401).json("you are not authenticated")


        jwt.verify(token, JWT, (err, user)=>{
            if(err) return res.status(400).json("token is not valid")
                req.user= user;
            next()
        })
}

export const verifyRole = (role) =>{
    return (req, res, next) =>{
      
        if(req.user.role!== role) {
        return res.status(403).json({message: "you do not have the required permission"})
        }
        next()
    }

}