"use client"

import React, { useEffect, useMemo } from "react";
import { getSocket } from "@/lib/socket.config";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../ui/button";

export default function ChatBase({ groupId }: { groupId: string }) {
    const socket = useMemo(() => {
        const socketInstance = getSocket();
        socketInstance.auth= {
            room: groupId,
        };
        return socketInstance.connect();
    }, []);

    useEffect(() => {
        const handleMessage = (data: any) => {
            console.log("The Socket Message is", data); // This should log the correct data
        };

        socket.on("message", handleMessage);

        return () => {
            socket.off("message", handleMessage); // Ensure to remove the listener
            socket.disconnect();
        };
    }, []);

    const sendMessage = () => {
        const messageData = { name: "John", id: uuidv4() };
        console.log("Sending message...", messageData);
        socket.emit("message", messageData); // Ensure the correct data is emitted
        console.log("Message sent");
    };

    return (
        <div>
            <Button onClick={sendMessage}>Send Message</Button>
        </div>
    );
}