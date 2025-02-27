import express from "express"
import cors from "cors"
import cookieParser from 'cookie-parser';

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
}))


app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


//import route
import userRoute from "../src/routes/user.router.js"
import postRoute from "../src/routes/post.router.js"
import commentRoute from "../src/routes/comment.route.js";

//routes declaration
app.use("/api/v1/user",userRoute)
app.use("/api/v1/post", postRoute)

export { app }