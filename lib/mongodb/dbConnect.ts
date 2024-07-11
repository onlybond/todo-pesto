import mongoose from "mongoose";

const connectDB = async () => {
  const connURI = process.env.MONGODB_URI;
  try {
    if (connURI) {
      await mongoose.connect(connURI);
    }
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
