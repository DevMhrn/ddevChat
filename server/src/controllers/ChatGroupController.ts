import { Request, Response } from "express";
import prisma from "../config/db.config.js";

class ChatGroupController{

    static async show(req:Request, res:Response){
        try {

           
            const id = req.params.id;
            const groups = await prisma.chatGroup.findUnique({
                where:{
                    id : id
                }
            })
            
            res.status(200).json({success:true, message:"Chat Group Fetched Successfully", data:groups});

            return;
        } catch (error) {
            res.status(500).json({success:false, message:"Internal Server Error"});
            console.log(error);
            return;
            
        }

    }

    static async index(req:Request, res:Response){
        try {
            const user = req.user;
            const chatGroups = await prisma.chatGroup.findMany({
                where:{
                    userId : user.id
                },
                orderBy:{
                    createdAt : 'desc'
                }
            })
            
            res.status(200).json({success:true, message:"All Chat Group Fetched Successfully", data:chatGroups});

            return;
        } catch (error) {
            res.status(500).json({success:false, message:"Internal Server Error"});
            console.log(error);
            return;
            
        }

    }

    static async store(req:Request, res:Response){
        try {

            const body = req.body;
            const user = req.user;
            await prisma.chatGroup.create({
                data:{
                    title : body.title,
                    passcode : body.passcode,
                    userId : user.id, 
                }
            })
            
            res.status(200).json({success:true, message:"Chat Group Created Successfully"});

            return;
        } catch (error) {
            res.status(500).json({success:false, message:"Internal Server Error"});
            console.log(error);
            return;
            
        }

    }

    static async update(req:Request, res:Response){
        try {

            const body = req.body;
            const id = req.params.id;       
            await prisma.chatGroup.update({
                where:{
                    id : id
                },
                data:{
                    title : body.title,
                    passcode : body.passcode,

                    
                }
            })
            
            res.status(200).json({success:true, message:"Chat Group Updated Successfully"});

            return;
        } catch (error) {
            res.status(500).json({success:false, message:"Internal Server Error"});
            console.log(error);
            return;
            
        }

    }
    static async delete(req:Request, res:Response){
        try {

           
            const id = req.params.id;
            await prisma.chatGroup.delete({
                where:{
                    id : id
                }


            })
            
            res.status(200).json({success:true, message:"Chat Group Deleted Successfully"});

            return;
        } catch (error) {
            res.status(500).json({success:false, message:"Internal Server Error"});
            console.log(error);
            return;
            
        }

    }

}

export default ChatGroupController;






