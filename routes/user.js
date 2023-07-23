const express = require("express");
const userRouter = express.Router();
const passport = require("passport");
const userController = require("../controller/user_controller");
userRouter.post("/create", userController.createUser);
userRouter.post(
  "/sign-in",
  passport.authenticate("local", {
    failureRedirect: "/",
  }),
  userController.signIn
);

module.exports = userRouter;
