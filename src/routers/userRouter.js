import express from "express";
import { getUser, postJoin } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/login", getUser);
userRouter.post("/join", postJoin);

export default userRouter;
