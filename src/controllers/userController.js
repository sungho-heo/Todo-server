import User from "../models/User.js";
import jwt from "jsonwebtoken";
export const postUser = async (req, res) => {
  const { name } = req.body;
  const user = await User.findOne({ name: name });
  const secretKey = process.env.SECRET;
  const tokenTime = Math.floor(Date.now() / 1000) * 60 * 60;
  if (user) {
    const token = jwt.sign({ name: name, exp: tokenTime }, secretKey);
    return res.json({ token });
  }
  return res.sendStatus(404);
};

export const postJoin = async (req, res) => {
  const { name } = req.body;
  try {
    const user = User.findOne({ name: name });
    if (!user) {
      const newUser = new User({ name: name });
      // db에 저장
      await newUser.save();
      res.status(201).json(newUser);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
