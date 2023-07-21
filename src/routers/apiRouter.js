import express from "express";
import { postTodo, getTodo, deleteTodo } from "../controllers/apiController.js";

const apiRouter = express.Router();

apiRouter.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://sungho-heo.github.io");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

apiRouter.get("/", getTodo);
apiRouter.post("/todos", postTodo);
apiRouter.delete("/todo/delete", deleteTodo);

export default apiRouter;
