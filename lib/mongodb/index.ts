import mongoose from "mongoose";

type ConnectionObject = {
  isConnected: boolean;
};

const connection: ConnectionObject = {
  isConnected: false,
};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URL || "");
    connection.isConnected = true;
    console.log("Connected to database");
  } catch (error) {
    console.error("Error connecting to database:", error);
    throw error; // re-throw the original error
  }
}

export default { dbConnect, connection };