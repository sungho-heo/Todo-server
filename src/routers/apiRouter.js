import express from "express";
import { postTodo, getTodo, deleteTodo } from "../controllers/apiController.js";

const apiRouter = express.Router();

apiRouter.get("/todo", getTodo);
apiRouter.post("/todos", checkAuth, postTodo);
apiRouter.delete("/todo/delete", deleteTodo);

export default apiRouter;
