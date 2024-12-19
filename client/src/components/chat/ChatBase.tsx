"use client"

import React, { useEffect, useMemo, useState } from "react";
import { getSocket } from "@/lib/socket.config";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../ui/button";
import ChatSidebar from "./ChatSideBar";
import ChatNav from "./ChatNav";
import ChatUserDialog from "./ChatUserDialog";
import ActualChats from "./ActualChats";

export default function ChatBase({group, users, oldMessages}:
    {group:ChatGroupType, users:Array<ChatGroupUserType>|[], oldMessages:Array<MessagesType>|[]}  ) {
    // const socket = useMemo(() => {
    //     const socketInstance = getSocket();
    //     socketInstance.auth= {
    //         room: groupId,
    //     };
    //     return socketInstance.connect();
    // }, []);

    // useEffect(() => {
    //     const handleMessage = (data: any) => {
    //         console.log("The Socket Message is", data); // This should log the correct data
    //     };

    //     socket.on("message", handleMessage);

    //     return () => {
    //         socket.off("message", handleMessage); // Ensure to remove the listener
    //         socket.disconnect();
    //     };
    // }, []);

    // const sendMessage = () => {
    //     const messageData = { name: "John", id: uuidv4() };
    //     console.log("Sending message...", messageData);
    //     socket.emit("message", messageData); // Ensure the correct data is emitted
    //     console.log("Message sent");
    // };

    const [open, setOpen] = useState(true);
    const [chatUser, setChatUser] = useState<ChatGroupUserType|null>(null);

    useEffect(() => {
        const localData = localStorage.getItem(group.id);
        if(localData){
            setChatUser(JSON.parse(localData));
        }
    }, [group.id]);

    

    return (
        <div className="flex ">
            <ChatSidebar users={users} />  
            <div className='w-full md:w-4/5 bg-gradient-to-r from-blue-500 to-purple-500'>
                {
                    open ? <ChatUserDialog open={open} setOpen={setOpen} group={group}/> : <ChatNav chatGroup={group} users={users}/> 
                }
            </div>
            <ActualChats group={group} chatUser={chatUser || undefined} oldMessages={oldMessages}/>  

            {/* <Button onClick={sendMessage}>Send Message</Button> */}
        </div>
    );
}