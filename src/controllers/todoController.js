import Todo from "../models/Todos.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const secretKey = process.env.SECRET;

export const getTodo = async (req, res) => {
  const token = req.headers.authorization;
  const tokenValue = token.split(" ")[1];
  if (!token) {
    return res.sendStatus(401);
  }
  try {
    const decode = jwt.verify(tokenValue, secretKey);
    const name = decode.name;
    const user = User.findOne({ name: name });
    if (!user) {
      return res.sendStatus(400);
    }
    const todo = Todo.findById(user.todoList);
    if (todo.todo) {
      return res.json({ dataTodo: todo.todo });
    }
    return res.send("Plz create todo and save!");
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
  const { todo } = req.body;
  const token = req.headers.authorization;
  const tokenValue = token.split(" ")[1];
  if (!token) {
    return res.sendStatus(400);
  }
  const decode = jwt.verify(tokenValue, secretKey);
  const user = await User.findOne({ name: decode.name });
  try {
    if (user) {
      if (user.todoList) {
        // user에 todoList가 존재하는 경우 로직임.
        // 이부분을 적용하지 않으면 사용자는 todo가 업데이트 되는게 아니고 새롭게 계속 기존의 todo가 데이터베이스에 쌓이게됨.
        // 해당 문제를 해결하기위해서 현 user에게 todoList를 이미 저장한게 있다면 해당 todoList에서 추가하거나 삭제한경우를 업데이트 해주기 위함.
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
      const newTodo = await Todo.create({ todo: todo, owner: user._id });
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
  const token = req.headers.authorization;
  const tokenValue = token.split(" ")[1];
  if (!token) {
    return res.sendStatus(400);
  }
  const decode = jwt.verify(tokenValue, secretKey);
  const user = User.findOne({ name: decode.name });
  if (user) {
    if (user.todoList) {
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
    } else {
      return res.send("server not found data");
    }
  }
  return res.sendStatus(404);
};
