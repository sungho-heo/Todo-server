import User from "../models/User.js";
export const getUser = (req, res) => {
  const user = User.findOne({ name: req.body.name });
  res.json(user);
};

export const postJoin = async (req, res) => {
  const { name } = req.body;
  try {
    const newUser = new User({ name: name });
    // db에 저장
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
