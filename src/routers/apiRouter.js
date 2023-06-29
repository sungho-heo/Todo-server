import express from "express";
import { postTodo, getTodo, deleteTodo } from "../controllers/apiController.js";

const apiRouter = express.Router();

// 로그인 확인 미들웨어
const checkAuth = (req, res, next) => {
  if (!req.session.user) {
    return res.sendStatus(401);
  }
  next();
};

apiRouter.get("/todo", getTodo);
apiRouter.post("/todos", checkAuth, postTodo);
apiRouter.delete("/todo/delete", deleteTodo);

export default apiRouter;
