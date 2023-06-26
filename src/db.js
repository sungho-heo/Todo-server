import mongoose from "mongoose";

if (process.env.NODE_ENV === "development") {
  mongoose.connect(process.env.DB_URL_DEV);
} else {
  mongoose.connect(process.env.DB_URL);
}

const db = mongoose.connection;

const handleOpen = () => console.log("✅ Connected to DB");
const handleError = (error) => console.log("❌ DB error", error);

db.on("error", handleError);
db.once("open", handleOpen);
