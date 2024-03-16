import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import commentRoutes from "./routes/comment.route.js";
import postRoutes from "./routes/post.route.js";
// path,,, for deploying
import path from "path";


dotenv.config();

mongoose.
    connect(process.env.MONGO)
    .then(() => { 
        console.log("Connected to MongoDB!");
    })
    .catch((err) => {
        console.log(err);
});

const __dirname = path.resolve();

const app = express();

app.use(express.json()); // allows you to send json to b

app.use(cookieParser());



app.listen(3000, () => {
    console.log("Server is running on port 3000!");
});

app.use("/api/user", userRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/post", postRoutes);

app.use('/api/comment', commentRoutes);

// here, make sure you put it after routes, alsoo we used dist because we used vite
app.use(express.static(path.join(__dirname, "/client/dist")));
app.get("*", (req, res, next) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});




//middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server error!";

    res.status(statusCode).json ({
        success: false,
        statusCode,
        message
    });
});