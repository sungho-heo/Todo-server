import express from "express";
import { postUser, postJoin } from "../controllers/userController";
import {
  postTodo,
  getTodo,
  deleteTodo,
} from "../controllers/todoController.js";

const apiRouter = express.Router();

apiRouter.post("/user/login", postUser);
apiRouter.post("/user/join", postJoin);
apiRouter.get("/todo", getTodo);
apiRouter.post("/todos", postTodo);
apiRouter.delete("/todo/delete", deleteTodo);

export default apiRouter;
