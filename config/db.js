// import mongoose from "mongoose"

// const connectDb=async () => {
//     try {
//         await mongoose.connect(process.env.MONGODB_URL)
//         console.log("db connected")
//     } catch (error) {
//         console.log("db error")
//     }
// }

// export default connectDb

import mongoose from "mongoose";

const connectDb = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is not defined in environment variables");
        }

        const conn = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 20000,   // Increased timeout
            socketTimeoutMS: 60000,
            family: 4,                         // Force IPv4 (helps on some hosts)
        });

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error.message);
        throw error;   // Let the caller handle it
    }
};

export default connectDb;