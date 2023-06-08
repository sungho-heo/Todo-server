import express from "express";
import { postTodo, getTodo } from "./apiController.js";

const apiRouter = express.Router();

apiRouter.post("/todos", postTodo);
apiRouter.get("/todo", getTodo);

export default apiRouter;
