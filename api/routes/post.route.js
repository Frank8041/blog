import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { create, deletepost, getposts } from "../controllers/post.controllers.js";

const router = express.Router();

router.post("/create", verifyToken, create);
//here, we dont want to verify the user, because everyone without authentication can search the posts
router.get("/getposts", getposts);
router.delete('/deletepost/:postId/:userId', verifyToken, deletepost)

export default router;