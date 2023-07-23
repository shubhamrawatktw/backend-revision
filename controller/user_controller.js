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

const signIn = async (req,res) => {
    res.json({msg:"home"})
}

module.exports = {
  createUser,signIn
};
