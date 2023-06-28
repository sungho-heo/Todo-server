import User from "../models/User.js";
export const postUser = async (req, res) => {
  const user = await User.findOne({ name: req.body.name });
  if (user) {
    req.session.user = user;
    console.log(req.session.user);
    return res.json(user.name);
  }
  return res.sendStatus(404);
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
