import Todo from "./Todos.js";

export const getTodo = async (req, res) => {
  const data = await Todo.find({});
  res.json(data);
};

export const postTodo = async (req, res) => {
  const { todoList } = req.body;
  try {
    if (todoList.length > 2) {
      const newTodo = new Todo({ todo: todoList });
      // db에 저장
      await newTodo.save();
      res.status(201).json(newTodo);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
