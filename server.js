require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const ApiRoutes = require("./routes/ApiRoutes");
const { connectDB } = require("./DB/databaseConnection");
const path = require("path")

// const { uploads } = require("./config/multerConfig");

const app = express();

const PORT = process.env.PORT;



app.use(cors({origin:"http://localhost:5173",credentials:true}));
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname,"uploads")));
app.use(express.urlencoded({ extended: false }));
app.use("/api", ApiRoutes);
app.use("/uploads", express.static("uploads"));

app.listen(PORT, async () => {
  try {
    let connet = await connectDB();
    console.log(connet);
    console.log(`server is running on port http://localhost:${PORT}`);
  } catch (error) {
    console.log(`somthing went wrong : ${error.message}`);
  }
});
