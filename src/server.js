import express from "express"
import morgan from "morgan"

const app = express()
const PORT = 4000

const handleServer = () => {
  console.log(`🚀 https://localhost:${PORT}/`)
}
app.use(morgan("dev"))
app.get("/", (req, res) => {
  res.send("Hello World")
})
app.listen(PORT, handleServer)
