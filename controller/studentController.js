const Student = require("../model/studentModel");
const ApiResponse = require("../utils/ApiResponse");

const { generateJwtToken } = require("../config/jwtToken");

const studentGetById = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById({ _id: id }).select("-password");
    return res
      .status(200)
      .json(new ApiResponse(true, student, "Succesfully fetched user"));
  } catch (Error) {
    return res
      .status(500)
      .json(new ApiResponse(false, null, "Not Able to fetch Student"));
  }
};
const studentRegister = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      mobile,
      city,
      study,
      profile,
      referralCode,
      role,
      attemps,
    } = req.body;

    const existingStudent = await Student.findOne({ email });

    if (existingStudent) {
      return res
        .status(400)
        .json(new ApiResponse(false, null, "Student Already Resistered"));
    }

    const student = await Student.create({
      name,
      email,
      password,
      mobile,
      city,
      study,
      profile,
      referralCode,
      role,
      attemps,
    });
    console.log("running5");
    await student.save();
    res
      .status(201)
      .json(new ApiResponse(true, student, "Student Registered Succefully"));
  } catch (error) {
    res.status(500).json(new ApiResponse(false, null, error.message, 500));
  }
};

const studentLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const oneStudent = await Student.findOne({ email });
    if (!oneStudent)
      return res
        .status(404)
        .json(new ApiResponse(false, null, "Email Not Exist In DATABASE", 404));

    const isMatch = await oneStudent.comparePassword(password);

    if (!isMatch)
      return res
        .status(500)
        .json(new ApiResponse(false, null, "Wrong Password", 500));

    let studentDetails = { ...oneStudent._doc };
    delete studentDetails.password;

    const token = await generateJwtToken(studentDetails);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "None",
    });

    return res
      .status(200)
      .json(new ApiResponse(200, oneStudent, "user loggedIN succefully"));
  } catch (error) {
    res.status(500).json(new ApiResponse(false, null, error.message, 500));
  }
};

const studentsGetAll = async (req, res) => {
  try {
    const students = await Student.find();
    res
      .status(200)
      .json(new ApiResponse(200, students, "Students successfully fetched"));
  } catch (error) {
    res
      .status(500)
      .json(new ApiResponse(false, null, "Can't able to get all Student", 500));
  }
};

const studentDeleteById = async (req, res) => {
  try {
  
    const deleted = await Student.findByIdAndDelete( req.params.id)
    if(!deleted){
      return res
        .status(404)
        .json(new ApiResponse(false, null, "Provide Valid Student Id", 404));

    }
    res
      .status(200)
      .json(new ApiResponse(200, deleted, "Student Deleted Successfully"));
  } catch (error) {
    res
      .status(500)
      .json(new ApiResponse(false, null, "Can't able to delete user", 500));
  }
};

const studentUpdateById = async (req, res) => {
  try {
    const updates = req.body;

    const updated = await Student.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res
        .status(404)
        .json(new ApiResponse(false, null, "Provide Valid Student Id", 404));
    }

    res
      .status(200)
      .json(new ApiResponse(200, updated, "Student updated Successfully"));
  } catch (error) {
    res
      .status(500)
      .json(new ApiResponse(false, null, "Can't able to update user", 500));
  }
};

module.exports = {
  studentDeleteById,
  studentLogin,
  studentRegister,
  studentUpdateById,
  studentGetById,
  studentsGetAll,
};
