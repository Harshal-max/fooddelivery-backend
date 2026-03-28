// import express from "express"
// import dotenv from "dotenv"
// dotenv.config()
// import connectDb from "./config/db.js"
// import cookieParser from "cookie-parser"
// import authRouter from "./routes/auth.routes.js"
// import cors from "cors"
// import userRouter from "./routes/user.routes.js"

// import itemRouter from "./routes/item.routes.js"
// import shopRouter from "./routes/shop.routes.js"
// import orderRouter from "./routes/order.routes.js"
// import http from "http"
// import { Server } from "socket.io"
// import { socketHandler } from "./socket.js"

// const app=express()
// const server=http.createServer(app)

// const io = new Server(server, {
//   cors: {
//     origin: [
//       "http://localhost:5173",
//       "https://fooddelivery-frontend-navy.vercel.app"
//     ],
//     credentials: true,
//     methods: ["GET", "POST"]
//   }
// })

// app.set("io",io)



// const port=process.env.PORT || 5000
// app.use(cors({
//     origin: [
//         "http://localhost:5173",
//         "https://fooddelivery-frontend-navy.vercel.app"
//     ],
//     credentials: true
// }))
// app.use(express.json())
// app.use(cookieParser())
// app.use("/api/auth",authRouter)
// app.use("/api/user",userRouter)
// app.use("/api/shop",shopRouter)
// app.use("/api/item",itemRouter)
// app.use("/api/order",orderRouter)

// socketHandler(io)
// server.listen(port,()=>{
//     connectDb()
//     console.log(`server started at ${port}`)
// })




import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import itemRouter from "./routes/item.routes.js";
import shopRouter from "./routes/shop.routes.js";
import orderRouter from "./routes/order.routes.js";

import { socketHandler } from "./socket.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: [
            "http://localhost:5173",
            "https://fooddelivery-frontend-navy.vercel.app"
        ],
        credentials: true,
        methods: ["GET", "POST"]
    }
});

app.set("io", io);

const port = process.env.PORT || 5000;

// CORS middleware
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://fooddelivery-frontend-navy.vercel.app"
    ],
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/shop", shopRouter);
app.use("/api/item", itemRouter);
app.use("/api/order", orderRouter);

socketHandler(io);

// Start server FIRST, then connect to DB
server.listen(port, async () => {
    console.log(`🚀 Server started on port ${port}`);

    try {
        await connectDb();   // ← Now awaited properly
        console.log("✅ MongoDB connected successfully");
    } catch (error) {
        console.error("❌ MongoDB connection failed:", error.message);
        // Do not exit on Render — let it keep running but log clearly
    }
});