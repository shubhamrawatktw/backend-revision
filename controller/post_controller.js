const Post = require("../models/post");

const createPost = async (req, res) => {
  try {
    const { content } = req.body;
    if (!content.trim()) {
      return res.status(500).json({ msg: "Content req" });
    }
   const post = await Post.create({ content: content.trim(), user:req.user._id });
   return res.json({msg:"Post created",data:post})
  } catch (error) {
    console.log(error,"error while creating post ")
  }
};

module.exports = {
  createPost,
};
