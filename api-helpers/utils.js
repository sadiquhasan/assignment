import mongoose from "mongoose";
// require("dotenv").config();

const database = process.env.DATABASE
// const database = "mongodb+srv://admin:12345@cluster0.8f52sev.mongodb.net/?retryWrites=true&w=majority"

export const connectDB = async () => {
  await mongoose
    .connect(database)
    .then((res) => console.log("connected"))
    .catch((err) => console.log("error", err));
};
