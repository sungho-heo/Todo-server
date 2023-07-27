import Todo from "../models/Todos.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const getTodo = async (req, res) => {
  console.log(req.headers);
  const token = req.headers.authorization;
  const secretKey = process.env.SECRET;
  if (!token) {
    return res.sendStatus(400);
  }
  try {
    console.log(token);
    const decode = jwt.verify(token, secretKey);
    console.log(decode);
    //  return res.json({ dataTodo: todo.todo });
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const postTodo = async (req, res) => {
  /*
  todo를 생성하기전 현재 로그인된 유저확인 후 생성 
  또한 생성된 todo db id값은 user db에 들어가게해서 어떤유저의 todo인지 알수있도록함.
  */
  console.log(req.session);
  const { todo } = req.body;
  const { _id } = req.session.user;
  const user = await User.findById(_id);
  try {
    if (user) {
      if (user.todoList) {
        // user에 todoList가 존재하는 경우 로직임.
        const updateTodo = await Todo.findById(user.todoList);
        const filter = { _id: updateTodo._id };
        const update = { todo: todo };
        const doc = await Todo.findOneAndUpdate(filter, update, {
          new: true,
        });
        await doc.save();
        return res.sendStatus(201);
      }
      // db에 저장
      const newTodo = await Todo.create({ todo: todo, owner: _id });
      user.todoList = newTodo.id;
      await user.save();
      return res.sendStatus(201);
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const deleteTodo = async (req, res) => {
  /*
  Todo front > todo delete 실행시 backend에서 front에서 삭제된 텍스트 값을 받아와서 
  현재 로그인된 user안의 todo를 찾아서 해당 todoList에서 삭제된 텍스트를 찾음.
  찾았으면 해당 text를 db에서 삭제함.
  */
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
