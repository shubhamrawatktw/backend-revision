const express = require("express")
const postRouter = express.Router()
const postController = require("../controller/post_controller")

postRouter.post("/create",postController.createPost)

module.exports = postRouter