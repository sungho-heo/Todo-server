import "dotenv/config";
import "./db.js";
import "./models/Todos.js";
import "./models/User.js";
import app from "./server.js";

const PORT = process.env.PORT || 8080;

const handleServer = () => {
  console.log(`🚀 http://localhost:${PORT}/`);
};

app.listen(PORT, handleServer);
