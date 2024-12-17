import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authMiddleware = (req:Request, res:Response, next:NextFunction) => {
    const authHeader = req.headers.authorization;
    if(authHeader === null || authHeader === undefined){
        res.status(401).json({message:"Unauthorized"});
        return;
    }
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err){
            res.status(401).json({message:"Unauthorized"});
            return;
        }

        req.user = user as Authuser;
        next();
        
    })

}

export default authMiddleware;
