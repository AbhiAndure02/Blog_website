import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
import postRoutes from './routes/post.route.js'
import cookieParser from "cookie-parser";
import commentRoutes from './routes/comment.route.js';
import path from 'path';
dotenv.config();
mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log("mongodb is connected")
})
.catch((err)=>{
    console.log(err, "error is here")
})

const __dirname = path.resolve();
const app = express();

app.use(cookieParser());

app.use(express.json());

app.listen(3000, () =>{
    console.log("server is running on 3000 port ")
});

app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/post', postRoutes)
app.use('/api/comment', commentRoutes);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
})

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error"
    res.status(statusCode).json({
        success : false,
        statusCode: 500,
        message
    });
});