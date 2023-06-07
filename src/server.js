import express from "express"
import morgan from "morgan"
import path from "path"
import apiRouter from "./apiRouter.js"

const app = express()
const PORT = 8080

const handleServer = () => {
  console.log(`🚀 http://localhost:${PORT}/`)
}
app.use(morgan("dev"))
app.use(express.urlencoded({ extended: true }))
// server.js
app.use(express.static(path.join(__dirname, "../client/build")))
app.use("/api", apiRouter)

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build/index.html"))
})
app.listen(PORT, handleServer)

// react router를 사용하기위해서 user가 router를 입력하면 react 페이지를 보여주기위해서임.
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"))
})
