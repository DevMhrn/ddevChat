import { Request, Response } from "express";
import { AuthControllerInterface } from "./AuthControllerInterface.js";
import prisma from "../config/db.config.js";
import jwt from "jsonwebtoken";


class AuthController{

    static async login(req:Request, res:Response){
        try{
            const body = req.body as AuthControllerInterface;
            let findUser = await prisma.user.findUnique({
                where:{
                    email:body.email
                }
            })
            if(!findUser){
                let findUser = await prisma.user.create({
                    data:body
                })
            }
            let JWTPayload = {
                id:findUser.id,
                email:body.email,
                name:body.name,
                
            }
            const token = jwt.sign(JWTPayload, process.env.JWT_SECRET as string, {expiresIn:"365d"});
            res.status(200).json({
                message:"Login Successfully",
                
                user:{
                    ...findUser,
                    token:`Bearer ${token}`
                }

            });
            return;
        }catch(error){  
            res.status(500).json({message:"Something went wrong, Please try again later"});
            console.log(error);
            return;
        }

    }
}

export default AuthController;



