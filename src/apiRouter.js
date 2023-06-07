import express from "express"
import { todoPost } from "./apiController.js"

const apiRouter = express.Router()

apiRouter.post("/todos", todoPost)

export default apiRouter
