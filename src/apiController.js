import Todo from "./Todos.js";

export const todoPost = async (req, res) => {
  const { todo } = req.body;
  try {
    const newTodo = new Todo({ todo });
    // db에 저장
    await newTodo.save();

    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
