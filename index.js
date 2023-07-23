require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser")
const port = process.env.PORT;
const userRouter = require("./routes/user")

const app = express();
connectDB();

// middlewares :-
app.use(express.urlencoded())
app.use(express.json());
app.use(cookieParser())


const versionPrefix = "/api/v1";
// routes 
app.get("/",()=>{console.log("hello")})
app.use(`${versionPrefix}/user`,userRouter)

app.listen(port, (err) => {
  if (err) {
    throw err;
  }

  console.log("server is running on" + port);
});
