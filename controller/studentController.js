const Student = require("../model/studentModel");
const ApiResponse = require("../utils/ApiResponse");
const generateTokens = require("../config/generateJwtTokens");

const handleGetById = async (req, res) => {
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
const handleRegister = async (req, res) => {
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

    await student.save();
    res
      .status(201)
      .json(new ApiResponse(true, student, "Student Registered Succefully"));
  } catch (error) {
    res
      .status(500)
      .json(
        new ApiResponse(false, null, "Can't able to register student", 500)
      );
  }
};

const handlelogin = async (req, res) => {
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

    const token = await generateTokens();
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "None",
    });

    return res
      .status(200)
      .json(new ApiResponse(200, oneStudent, "user loggedIN succefully"));
  } catch (error) {
    res
      .status(500)
      .json(new ApiResponse(false, null, "Can't able to login student", 500));
  }
};

const handleGetAll = async (req, res) => {
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

const handleDeleteById = async (req, res) => {
  try {
    const studentId = req.params.id;
    const isExist = await Student.findById({ _id: studentId });
    if (!isExist)
      return res
        .status(404)
        .json(new ApiResponse(false, null, "Provide Valid Student Id", 404));
    const deleted = await Student.findByIdAndDelete({ _id: studentId });
    res
      .status(200)
      .json(new ApiResponse(200, deleted, "Student Deleted Successfully"));
  } catch (error) {
    res
      .status(500)
      .json(new ApiResponse(false, null, "Can't able to delete user", 500));
  }
};

const handleUpdateById = async (req, res) => {
   try {
    const studentId = req.params.id;
    const updates = req.body
    const isExist = await Student.findById({ _id: studentId });
    if (!isExist)
      return res
        .status(404)
        .json(new ApiResponse(false, null, "Provide Valid Student Id", 404));
        const updated = await Student.findByIdAndUpdate({_id:studentId},{$set:updates},{new:true,runValidators:true})
        res
      .status(200)
      .json(new ApiResponse(200, updated, "Student updated Successfully"));
       

}catch(error){
    res
      .status(500)
      .json(new ApiResponse(false, null, "Can't able to update user", 500));
}

}


module.exports = {
  handleGetById,
  handleRegister,
  handlelogin,
  handleGetAll,
  handleDeleteById,
  handleUpdateById
};
