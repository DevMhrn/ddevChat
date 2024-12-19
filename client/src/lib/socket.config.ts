import { io, Socket } from "socket.io-client";
import ENV from "@/lib/env";
let socket: Socket;
export function getSocket() {
    if (!socket) {
        const backendUrl = ENV.BACKEND_URL;
        // console.log("The backend url is", backendUrl);
        socket = io(backendUrl, {autoConnect:false});
          
    }
    return socket;
}

