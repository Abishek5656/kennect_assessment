import { Router } from 'express';
import {  createPost, getAllPost, deletePostDetails, updatePost } from "../controllers/post.controller.js"

const router = Router();

router.post("/create", createPost);

router.get("/posts", getAllPost);

router.patch("/update",updatePost);

router.delete("/delete", deletePostDetails)

export default router