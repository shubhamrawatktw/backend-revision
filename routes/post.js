const express = require("express")
const postRouter = express.Router()
const postController = require("../controller/post_controller")

postRouter.get("/all",postController.getAllPost)
postRouter.post("/create",postController.createPost)

module.exports = postRouter