require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const apiRouter = require("./routes/ApiRoutes");

const server = express();

// middlewares
server.use(cors);
server.use(express.json());
server.use(cookieParser());

server.use("/", apiRouter);

const PORT = process.env.PORT || 3000;
server.listen(PORT, (err) => {
  if (err) console.log(err.message);
  console.log(`server is running.. http://localhost:${PORT}`);
});
