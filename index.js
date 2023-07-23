require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const port = process.env.PORT;
const userRouter = require("./routes/user");
const postRouter = require("./routes/post");
// used for sessio cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const app = express();
connectDB();

// middlewares :-
app.use(express.urlencoded());
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: "blahblah",
    name: "ecommerce",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

const versionPrefix = "/api/v1";
// routes

app.use(`${versionPrefix}/user`, userRouter);
app.use(`${versionPrefix}/post`, postRouter);

app.listen(port, (err) => {
  if (err) {
    throw err;
  }

  console.log("server is running on" + port);
});
