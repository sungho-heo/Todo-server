import Todo from "../models/Todos.js";
import User from "../models/User.js";

export const getTodo = async (req, res) => {
  const { _id } = req.session.user;
  const user = await User.findById(_id);
  if (user) {
    const todo = await Todo.findById(user.todoList);
    if (todo) {
      return res.json({ dataTodo: todo.todo });
    }
  }
};

export const postTodo = async (req, res) => {
  const { todo } = req.body;
  const { _id } = req.session.user;
  const user = await User.findById(_id);
  try {
    if (user) {
      // db에 저장
      const newTodo = await Todo.create({ todo: todo, owner: _id });
      user.todoList.push(newTodo.id);
      await user.save();
      return res.sendStatus(201);
    }
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

export const deleteTodo = async (req, res) => {
  const { text } = req.query;
  const { _id } = req.session.user;
  const user = await User.findById(_id);
  if (user) {
    const todoList = await Todo.findById(user.todoList);
    if (todoList) {
      const filter = { _id: todoList._id };
      const newTodo = todoList.todo.filter((word) => word !== text);
      const update = { todo: newTodo };
      const doc = await Todo.findOneAndUpdate(filter, update, {
        new: true,
      });
      await doc.save();
      return res.sendStatus(201);
    }
  }
  return res.sendStatus(404);
};
