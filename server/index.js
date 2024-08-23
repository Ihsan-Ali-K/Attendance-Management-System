import express from "express"
import mongoose from "mongoose"
import userRoutes from "./Routes/user.js"
import attendanceRoute from "./Routes/attendance.js"
import adminRoutes from "./Routes/adminroutes.js"
import cookieParser from "cookie-parser"
import leaveReqRoutes from "./Routes/leaverequest.js"
import cors from "cors"
const app = express()
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
const  connect = () =>{
    mongoose.connect("mongodb+srv://ihsanalikhan339:blogs@cluster0.xm5lppf.mongodb.net/AMS")
    .then(() => {
        console.log("mongo db coonnected")
    }).catch((error) => {
        throw error
    })
}
const port = 8800 
app.use(cookieParser())
app.use(express.json())
app.use("/api/users", userRoutes)
app.use("/api/attendance", attendanceRoute)
app.use("/api/admin", adminRoutes)
app.use("/api/leave", leaveReqRoutes )

app.listen(port, ()=>{
    connect()
    console.log(`port is runiing on ${port}`)
})