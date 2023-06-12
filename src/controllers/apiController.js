import Todo from "../models/Todos.js";

export const getTodo = async (req, res) => {
  const data = await Todo.find({});
  res.json(data);
};

export const postTodo = async (req, res) => {
  const { todoList } = req.body;
  try {
    const newTodo = new Todo({ todo: todoList });
    // db에 저장
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
