import { Router } from 'express';
import {verifyJWT } from "../middleware/auth.middleware.js"

const router = Router();

router.use(verifyJWT);

router.post("/createComment/:postId")





export default router;