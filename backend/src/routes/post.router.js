import { Router } from 'express';
import {  createPost, getAllPost, deletePostDetails, updatePost } from "../controllers/post.controller.js";
import {verifyJWT } from "../middleware/auth.middleware.js"

const router = Router();

router.use(verifyJWT);

router.get("/allposts", getAllPost);

router.post("/create", createPost);

router.patch("/update/:id",updatePost);

router.delete("/delete/:id", deletePostDetails)


export default router