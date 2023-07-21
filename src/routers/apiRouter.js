import express from "express";
import cors from "cors";
import { postTodo, getTodo, deleteTodo } from "../controllers/apiController.js";

const apiRouter = express.Router();

apiRouter.use(
  cors({
    origin: "https://sungho-heo.github.io",
    credentials: true,
  })
);
apiRouter.get("/todo", getTodo);
apiRouter.post("/todos", postTodo);
apiRouter.delete("/todo/delete", deleteTodo);

export default apiRouter;
