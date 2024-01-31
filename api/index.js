import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
import cookieParser from "cookie-parser";
dotenv.config();
mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log("mongodb is connected")
})
.catch((err)=>{
    console.log(err, "error is here")
})
const app = express();

app.use(cookieParser());

app.use(express.json());

app.listen(3000, () =>{
    console.log("server is running on 3000 port ")
});

app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes
)
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error"
    res.status(statusCode).json({
        success : false,
        statusCode: 500,
        message
    });
});