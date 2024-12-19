import prisma from "../config/db.config.js";
import { Request, Response } from "express";
class ChatsControllers {

    static async getChats(req:Request, res:Response){
        const {groupId} = req.params;
        const chats = await prisma.chats.findMany({
            where : {
                groupId : groupId
            }
        });
        res.status(200).json({
            status : "success",
            message : "Chats fetched successfully",
            data : chats
        });
        return;

    }

}

export default ChatsControllers;
