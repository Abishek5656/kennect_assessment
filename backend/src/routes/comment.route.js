import { Router } from 'express';
import {verifyJWT } from "../middleware/auth.middleware.js"
import  {addComment, removeComment, getCommentsByPost} from "../controllers/comment.controller.js"

const router = Router();

router.use(verifyJWT);


router.get("/commentpost/:postId",getCommentsByPost);

router.post("/createComment/:postId",addComment);

router.delete("/:commentId", removeComment);








export default router;