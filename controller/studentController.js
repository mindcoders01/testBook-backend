const Student = require("../model/studentModel");
const ApiResponse = require("../utils/ApiResponse");

const { generateJwtToken } = require("../config/jwtToken");

const studentRegister = async (req, res) => {
  console.log("studentRegister run...",req.body);
  console.log("studentRegister run...",req.file);

  let profilePath = `http://localhost:8080/uploads/profile/${req.file.filename}`;
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

    const profilePath = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      : null;

    const student = await Student.create({
      name,
      email,
      password,
      mobile,
      city,
      study,
      profile: profilePath,
      profile: profilePath,
      referralCode,
      role,
      attemps,
    });
    const studentObj = student.toObject();
    delete studentObj.password;

    res
      .status(201)
      .json(new ApiResponse(true, studentObj, "Student Registered Succefully"));
  } catch (error) {
    console.log("Student register err->",error.message)
    res.status(500).json(new ApiResponse(false, null, error.message, 500));
  }
};

const studentProfileUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json(new ApiResponse(false, null, "No file uploaded"));
    }
    const profilePath = `${req.protocol}://${req.get("host")}/uploads/${
      req.file.filename
    }`;
    const student = await Student.findByIdAndUpdate(
      req.decodedUser._id,
      { profile: profilePath },
      { new: true }
    );

    if (!student) {
      return res
        .status(404)
        .json(new ApiResponse(false, null, "Student not found"));
    }

    res
      .status(200)
      .json(
        new ApiResponse(true, student, "Profile photo uploaded successfully")
      );
  } catch (error) {
    res
      .status(500)
      .json(new ApiResponse(false, null, error.message || "Server error"));
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

const studentLogout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "None",
    });
    return res
      .status(200)
      .json(new ApiResponse(true, null, "Logged out successfully"));
  } catch (error) {
    res.status(500).json(new ApiResponse(false, null, error.message, 500));
  }
};

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

const studentsGetAll = async (req, res) => {
  try {
    const query = { ...req.query };
    const limit = parseInt(query.limit) || 10;
    let skip = 0;
    if (query.page) {
      const page = parseInt(query.page) || 1;
      skip = (page - 1) * limit;
    } else if (query.skip) {
      skip = parseInt(query.skip) || 0;
    }

    const select = query.select ? query.select.split(",").join(" ") : null;
    const sort = query.sort ? query.sort.split(",").join(" ") : "-createdAt";
    console.log("check", skip);

    delete query.limit;
    delete query.skip;
    delete query.select;
    delete query.sort;
    delete query.page;

    const students = await Student.find(query)
      .select(select)
      .skip(skip)
      .limit(limit)
      .sort(sort);
    const total = await Student.countDocuments(query);
    res.set({ "X-Total-Count": total });
    res
      .status(200)
      .json(new ApiResponse(200, students, "Students successfully fetched"));
  } catch (error) {
    res.status(500).json(new ApiResponse(false, null, error.message, 500));
  }
};

const studentDeleteById = async (req, res) => {
  try {
    const deleted = await Student.findByIdAndDelete(req.params.id);
    if (!deleted) {
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
    const updates = {};
    const allowedUpdates = ["name", "email", "mobile", "city", "study"];
  
    for (let key of Object.keys(req.body)) {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key];
      }
    }
    const isEmpty = (obj) =>Object.keys(obj).length === 0;
    if (isEmpty(updates)) {
      return res
        .status(400)
        .json(
          new ApiResponse(false, null, "No fields provided for update", 400)
        );
    }

    const updated = await Student.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    ).lean();
    if (!updated) {
      return res
        .status(404)
        .json(new ApiResponse(false, null, "Provide Valid Student Id", 404));
    }

    res
      .status(200)
      .json(new ApiResponse(true, updated, "Student updated Successfully",200));
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
  studentProfileUpload,
  studentLogout,
};
