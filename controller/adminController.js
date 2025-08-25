const { generateJwtToken } = require("../config/jwtToken");
const { verifyPassword } = require("../utils/passwordManager");

const AdminModel = require("../model/adminModel");

//Register Controller
const registerAdmin = async (req, res) => {
  try {
    let { name, email, password, mobile, profile } = req.body;
    let admin = new AdminModel({
      name,
      email,
      password,
      mobile,
    });
    await admin.save();

    res.status(201).json({ message: "Admin Registered", data: admin });
  } catch (err) {
    console.error({ Route: "Register err", message: err.message });
    res.status(500).json({ Route: "Register err", message: err.message });
  }
};

//Update admin info Controller
const updateAdminDetails = async (req, res) => {
  try {
    const id = req.params.id;
    let { name, mobile, email } = req.body;

    let checkAdmin = await Admin.findOne({ _id: id });
    if (!checkAdmin) {
      return res.status(404).json({ message: "Someting went wrong" });
    }

    let updatedAdmin = await Admin.findByIdAndUpdate(
      id,
      { name, mobile }, //update fields
      { new: true, runValidators: true }
    );

    res
      .status(201)
      .json({ message: "Update Admin deatil", update: updatedAdmin });
  } catch (err) {
    console.error({ Route: "Update err", message: err.message });
    if (err.name === "CastError") {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    res.status(500).json({ Route: "Update err", message: err.message });
  }
};

//login Controller
const loginAdmin = async (req, res) => {
  try {
    let { email, password } = req.body;

    let findAdmin = await AdminModel.findOne({ email });
    if (!findAdmin)
      return res.status(404).json({ message: "Someting went wrong" });

    let validPassword = verifyPassword(password, findAdmin.password);
    if (!validPassword)
      return res.status(400).json({ message: "Someting went wrong" });

    const token = await generateJwtToken({
      id: findAdmin._id,
      email: findAdmin.email,
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(202).json({ message: `Login Successfuly ${findAdmin.name}` });
  } catch (err) {
    console.error({ Route: "Login err", message: err.message });
    res.status(500).json({ Route: "Login err", message: err.message });
  }
};

//Get details by id Controller
const getAdminDetails = async (req, res) => {
  const id = req.params.id;
  try {
    console.log("Params id->", id);
    const admin = await AdminModel.findById(id);
    console.log("get detail", admin);

    if (!admin) {
      return res.status(404).json({ message: "Someting went wrong" });
    }
    let adminDetals = admin.toObject();
    delete adminDetals.password;

    res.status(200).json(adminDetals);
  } catch (err) {
    if (err.name === "CastError") {
      console.error({ Route: "Get Admin err", message: err.name });
      return res.status(400).json({ message: "Invalid ID format" });
    }
    console.error({ Route: "Get Admin err", message: err.message });
    res.status(500).json({ Route: "Get Admin err", message: err.message });
  }
};

//Delete  Controller
const deleteAdminInfo = async (req, res) => {
  const _id = req.params.id;
  try {
    const deletedAdmin = await AdminModel.findByIdAndDelete(_id);
    if (!deletedAdmin) {
      return res.status(404).json({ message: "Someting went wrong" });
    }

    const details = deletedAdmin.toObject();
    delete details.password;

    res.status(200).json({ deleted: details });
  } catch (err) {
    console.error({ Route: "Delete err", message: err.message });

    if (err.name === "CastError") {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    res.status(500).json({ Route: "Delete err", message: err.message });
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
  getAdminDetails,
  deleteAdminInfo,
  updateAdminDetails,
};
