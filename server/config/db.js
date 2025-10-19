import mongoose from "mongoose";

export async function connectDB(mongoUri) {
  const uri =
    mongoUri || process.env.MONGO_URI || "mongodb://127.0.0.1:27017/momento";
  try {
    await mongoose.connect(uri, {
      // useNewUrlParser and useUnifiedTopology no longer required in mongoose >=6
    });
    console.log("Connected to MongoDB");
    return mongoose.connection;
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    throw err;
  }
}

export default connectDB;
