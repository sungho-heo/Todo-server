import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  todo: [{ type: String, required: true }],
  onwer: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
