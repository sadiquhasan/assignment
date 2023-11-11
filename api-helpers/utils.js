import mongoose from "mongoose";
import { config } from 'dotenv';
config();

const database = process.env.NEXT_PUBLIC_DATABASE

export const connectDB = async () => {
  await mongoose
    .connect(database)
    .then((res) => console.log("connected"))
    .catch((err) => console.log("error", err));
};
