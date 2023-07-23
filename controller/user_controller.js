const User = require("../models/user");

const createUser = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password, confirmPassword } = req.body;

    if (password.trim() !== confirmPassword.trim()) {
      return res.status(404).json({ msg: "wrong credentials" });
    }

    const user = await User.findOne({ email: email.trim() });
    if (user) {
      return res.json({ msg: "User already exist" });
    }

    const userCreated = await User.create({ email, name, password });
    return res
      .status(200)
      .json({ msg: "User created successfully", data: userCreated });
  } catch (error) {
    console.log(error, "error");
  }
};

const signIn = async (req, res) => {
  console.log(req.body);

  try {
    const email = req.body.email.trim();
    const password = req.body.password.trim();

    if (!email || !password) {
      return res.json({ msg: "invalid credentials" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ msg: "User not found" });
    }

    if (user.password !== password) {
      return res.json({ msg: "Invalid credentials - worong password" });
    }

    res.cookie("user_id", user.id);
    return res.status(200).json({ msg: "session created", data: user });
  } catch (error) {
    console.log(error, "error");
  }
};

module.exports = {
  createUser,
  signIn,
};
