const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config/config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
// get driver connection
const dbo = require("./config/conn");

const controller = require("./controllers/todoController");
/*
seguire questo esempio :https://github.com/expressjs/express/blob/master/examples/multi-router/index.js
app.get("/", (req, res) => {
  controller.getTodos(req, res);
});*/
app.use("/api/todo/v1", require("./controllers/todoController"));

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});
