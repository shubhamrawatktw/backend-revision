const express = require("express")
const userRouter = express.Router()
const userController = require("../controller/user_controller")
userRouter.post("/create",userController.createUser)



module.exports = userRouter