import {Server, Socket} from "socket.io";

interface SocketWithRoom extends Socket {
    data: {
        room: string;
    };
}

export function setupSocket(io: Server) {

    //to use handshake to get the room id
    io.use((socket: SocketWithRoom, next) => {
        //room will not be in the handshake object, therefore interface is needed
        const room = socket.handshake.auth.room || socket.handshake.headers.room;
        if (!room) {
            return next(new Error("Invalid room, Please enter the room id or check the room id "));
        }
        socket.data.room = room;
        next();
    });

    io.on("connection", (socket: SocketWithRoom) => {

        //person with room id will be connected to the room
        socket.join(socket.data.room);
        console.log("The Socket  connected...", socket.id);
        
        socket.on("message", (data) =>{
            console.log("Server Side Message:", data);
            // socket.broadcast.emit("message", data);
            //broadcast will not work here, because the socket is not in the room
            //to send message to the room, we need to use the room id
            io.to(socket.data.room).emit("message", data);

        });


        socket.on("disconnect", () => {
            console.log("The Socket disconnected...", socket.id);
        });
    });


}

