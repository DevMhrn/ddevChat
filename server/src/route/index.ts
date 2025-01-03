import {  Router } from "express";
import AuthController from "../controllers/AuthController.js";
import ChatGroupController from "../controllers/ChatGroupController.js";
import authMiddleware from "../middleware/AuthMiddleware.js";
import ChatGroupUserController from "../controllers/ChatGroupUserController.js";
import ChatsControllers from "../controllers/ChatsControllers.js";


const router = Router();
//auth routes
router.post('/auth/login', AuthController.login);

//chat group routes
router.get('/chat-group', authMiddleware, ChatGroupController.index);
router.get('/chat-group/:id',  ChatGroupController.show);
router.post('/chat-group', authMiddleware, ChatGroupController.store);
router.put('/chat-group/:id', authMiddleware, ChatGroupController.update);
router.delete('/chat-group/:id', authMiddleware, ChatGroupController.delete);

//chat group user routes
router.get('/chat-group-user',  ChatGroupUserController.index);
router.post('/chat-group-user',  ChatGroupUserController.store);

//chats routes
router.get('/chats/:groupId',  ChatsControllers.getChats);





export default router;







