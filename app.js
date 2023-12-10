const express = require("express");
const app = express();
require("dotenv").config();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
const { notFound } = require("./middleware/not-found");
const { errorHandler } = require("./middleware/errorHandler");
const PORT = process.env.PORT_NO || 5000;

// middlewares
app.use(express.static("./public"));
app.use(express.json());

// routes
app.use("/api/v1/tasks", tasks);
app.use(notFound);
app.use(errorHandler);

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, function (req, res) {
      console.log("Server started on port:", PORT);
    });
  } catch (error) {
    console.log("Something went wrong.");
    console.log(error);
  }
};

start();
