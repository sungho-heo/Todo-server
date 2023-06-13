import express from "express";
import { postTodo, getTodo } from "../controllers/apiController.js";

const apiRouter = express.Router();

apiRouter.post("/todos", postTodo);
apiRouter.get("/todo/:id", getTodo);

export default apiRouter;
