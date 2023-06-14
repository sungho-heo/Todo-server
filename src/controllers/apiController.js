import Todo from "../models/Todos.js";
import User from "../models/User.js";

export const getTodo = async (req, res) => {
  // const data = await Todo.find({});
  // res.json(data);
};

export const postTodo = async (req, res) => {
  const { todo } = req.body;
  const user = await User.find({ _id: req.session.user._id });
  try {
    if (user) {
      const { _id } = req.session.user;
      const newTodo = new Todo({ todo: todo, owner: _id });
      // db에 저장
      await newTodo.save();
      user.todoList.push(newTodo.id);
      user.save();
      return res.sendStatus(201);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
