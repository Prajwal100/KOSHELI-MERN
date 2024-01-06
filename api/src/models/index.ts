import mongoose from "mongoose";
import config from "../config";
const MONGO_URI = config.app.MONGO_URI;

mongoose.set("debug", config.app.ENV === "dev");
console.log('MONGO_URI',MONGO_URI)
mongoose
.connect(MONGO_URI)
.then(() => {
  console.log("Successfully connected to database");
})
.catch((error) => {
  console.error("MongoDB connection error:", error);
});


const db = mongoose.connection;

export default db;
