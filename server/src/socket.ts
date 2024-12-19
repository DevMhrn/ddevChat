import {Server} from "socket.io";

export function setupSocket(io: Server) {
    io.on("connection", (socket) => {
        console.log("The Socket  connected...", socket.id);
        
        socket.on("message", (data) =>{
            console.log("Server Side Message:", data);
            socket.broadcast.emit("message", data);

        });


        socket.on("disconnect", () => {
            console.log("The Socket disconnected...", socket.id);
        });
    });


}

