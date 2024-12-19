import { Request, Response } from 'express';
import prisma from '../config/db.config.js';
import { GroupUserTypeInterface } from './GroupUserTypeInterface.js';

class ChatGroupUserController {

    static async index(req:Request, res:Response){
        try {
            const groupId = req.query.group_id;
            console.log(req);
            console.log(req.query);
            console.log(groupId);
            if(!groupId){
                console.log("Group id is required");
                res.status(400).json({
                    success : false,
                    message : "Group id is required"
                });
                return;
            }
            const users = await prisma.groupUser.findMany({
                where : {
                    groupId : groupId as string
                },
                
            });
            res.status(200).json({
                success : true,
                data : users,
                message : "Users fetched successfully"
            });
            return;
        } catch (error) {
            res.status(500).json({
                success : false,
                message : "Internal server error, Try again later"
            });
            console.log(error);
            return;
        }
    }
    static async store(req:Request, res:Response){
        try {
           
            const body:GroupUserTypeInterface = req.body;
            console.log('The body is', body);
            const user = await prisma.groupUser.create({
                data : body
            });
            res.status(200).json({
                success : true,
                message : "Users Added successfully",
                data : user
            });
            return;
        } catch (error) {
            res.status(500).json({
                success : false,
                message : "Internal server error, Try again later"
            });
            console.log(error);
            return;
        }
    }

}

export default ChatGroupUserController ;