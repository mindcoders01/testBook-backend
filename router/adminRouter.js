const express = require("express");
const {
  registerAdmin,
  loginAdmin,
  getAdminDetails,
  deleteAdminInfo,
  updateAdminDetails,
} = require("../controller/adminController");
const Router = express.Router();

Router.use("/register", registerAdmin);
Router.get("/login", loginAdmin);
Router.get("/:id", getAdminDetails);
Router.get("/update/:id",updateAdminDetails)
Router.use("/delete/:id", deleteAdminInfo);

module.exports = Router;
