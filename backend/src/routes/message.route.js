import express from "express";
import {
     getConversationsForSidebar,
     getUserForSidebar,
     } from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";


const router = express.Router();

router.use(protectroute);

router.get("/users", getUsersForSidebar);
router.get("/conversations",  getConversationsForSidebar);
router.get("/Id",  getMessages);
router.post("/send/:id", upload.single("media"), getMessages);


export default router;