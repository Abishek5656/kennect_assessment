import express from "express"
import cors from "cors"
import cookieParser from 'cookie-parser';

const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true  
}));


app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))

//import route
import userRoute from "../src/routes/user.router.js"
import postRoute from "../src/routes/post.router.js"
import commentRoute from "../src/routes/comment.route.js";

//routes declaration
app.use("/api/v1/user",userRoute)
app.use("/api/v1/post", postRoute)
app.use("/api/v1/comment",commentRoute )

export { app }