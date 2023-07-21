import express from "express";
import { postTodo, getTodo, deleteTodo } from "../controllers/apiController.js";

const apiRouter = express.Router();

apiRouter.get("/", getTodo);
apiRouter.post("/todos", postTodo);
apiRouter.delete("/todo/delete", deleteTodo);

export default apiRouter;
