import express from "express";
import morgan from "morgan";
import MongoStore from "connect-mongo";
import path from "path";
import session from "express-session";
import apiRouter from "./routers/apiRouter.js";
import cors from "cors";

const app = express();
const corsOptions = {
  origin: "https://sungho-heo.github.io",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(morgan("dev"));
// body data backend 에서 받기위함
app.use(express.urlencoded({ extended: true }));
// json향태의 데이터를 front에 보내거나 받을때 사용
app.use(express.json());
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);

// server.js
app.use(express.static(path.join(__dirname, "../client/build")));
app.use("/api", apiRouter);

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build/index.html"));
});

// react router를 사용하기위해서 user가 router를 입력하면 react 페이지를 보여주기위해서임.
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

export default app;
