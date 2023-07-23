const Post = require("../models/post");

const getAllPost = async (req, res) => {
  try {
    const posts = await Post.find({}).populate({
        path:"user",
        select:{
            name:true,
            email:true
        }
    }).exec();
    if (!posts) return res.json({ msg: "No Post Found" });

    return res.status(200).json({
      msg: "Posts fetched successfully",
      data: posts,
    });
  } catch (error) {
    console.log(error, "error while getting posts");
  }
};

const createPost = async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res.status(500).json({ msg: "Content req" });
    }
    const post = await Post.create({
      content: content.trim(),
      user: req.user._id,
    });
    return res.json({ msg: "Post created", data: post });
  } catch (error) {
    console.log(error, "error while creating post ");
  }
};

module.exports = {
  createPost,
  getAllPost,
};
