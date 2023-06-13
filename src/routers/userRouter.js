import express from "express";
import { postUser, postJoin } from "../controllers/userController";

const userRouter = express.Router();

userRouter.post("/login", postUser);
userRouter.post("/join", postJoin);

export default userRouter;
