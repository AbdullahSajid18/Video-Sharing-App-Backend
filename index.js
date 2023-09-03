import express from 'express';
import mongoose, { connect } from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/users.js'
import videoRoutes from './routes/videos.js'
import commentRoutes from './routes/comments.js'
import authRoutes from './routes/auth.js'
import cookieParser from 'cookie-parser';


const app = express();
const PORT = 8000;
dotenv.config();

// middleware

// MIDDLEWARES
app.use(express.json());
app.use(cookieParser());



const connectDB = () => {
    mongoose
      .connect(process.env.Mongo_Url, { useNewUrlParser: true })
      .then(() => {
        console.log(`connected to db`);
      })
      .catch((err) => {
        throw err;
    });
};



// calling APIS
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/videos", videoRoutes)
app.use("/api/comments", commentRoutes)


app.use((err, req, res, next)=> {
  const status = err.status || 500;
  const message = err.message || "Something Went wrong!";
  return res.status(status).send({
    success: false,
    status,
    message
  });
})

app.listen(PORT, ()=> {
    connectDB();
    console.log(`Server is Running on port no ${PORT}`);
})