import express, { Application, Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
const app: Application = express();
const PORT = process.env.PORT || 7000;
import Routes from "./route/index.js";
import { Server } from "socket.io";
import { createServer } from "http";
import { setupSocket }   from "./socket.js";

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

setupSocket(io);



// * Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response) => {
  return res.send("It's working 🙌");
});
app.use('/api', Routes);

httpServer.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));


export { io };


