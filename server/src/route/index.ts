import {  Router } from "express";
import AuthController from "../controllers/AuthController.js";
import ChatGroupController from "../controllers/ChatGroupController.js";
import authMiddleware from "../middleware/AuthMiddleware.js";


const router = Router();
//auth routes
router.post('/auth/login', AuthController.login);

//chat group routes
router.post('/chat-group', authMiddleware, ChatGroupController.store);
router.get('/chat-group/:id', authMiddleware, ChatGroupController.show);
router.get('/chat-group ', authMiddleware, ChatGroupController.index);
router.delete('/chat-group/:id', authMiddleware, ChatGroupController.delete);
router.put('/chat-group/:id', authMiddleware, ChatGroupController.update);

export default router;







