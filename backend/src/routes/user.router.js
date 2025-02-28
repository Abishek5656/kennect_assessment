import { Router } from 'express';
import { registerUser, userLogin, userLogout} from "../controllers/user.controller.js"

const router = Router();


router.post("/register",registerUser);

router.post("/login",userLogin);

router.get("/logout", userLogout); 


export default router