import express from "express";
import morgan from "morgan";
import path from "path";
import apiRouter from "./apiRouter.js";
import mongoose from "mongoose";
import "./Todos.js";
import "dotenv/config";

mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;

const handleOpen = () => console.log("✅ Connected to DB");
const handleError = (error) => console.log("❌ DB error", error);

db.on("error", handleError);
db.once("open", handleOpen);

const app = express();
const PORT = 8080;

const handleServer = () => {
  console.log(`🚀 http://localhost:${PORT}/`);
};
app.use(morgan("dev"));
// body data backend 에서 받기위함
app.use(express.urlencoded({ extended: true }));
// json향태의 데이터를 front에 보내거나 받을때 사용하기위함.
app.use(express.json());
// server.js
app.use(express.static(path.join(__dirname, "../client/build")));
app.use("/api", apiRouter);

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build/index.html"));
});
app.listen(PORT, handleServer);

// react router를 사용하기위해서 user가 router를 입력하면 react 페이지를 보여주기위해서임.
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});
