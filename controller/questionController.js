const Questions = require("../model/questionModel");
const ApiResponse = require("../utils/ApiResponse");

const questionAdd = async (req, res) => {
   
  let figurePath = req.file?`http://localhost:8080/uploads/figure/${req.file.filename}`:null;
  try {
    const {
      question,
      type,
      option1,
      option2,
      option3,
      option4,
      answer,
      note,
      figure,
      subject,
      level,
    } = req.body;
    const added = await Questions.create({
      question,
      type,
      option1,
      option2,
      option3,
      option4,
      answer,
      note,
      figure:figurePath,
      subject,
      level,
    });
    res
      .status(200)
      .json(
        new ApiResponse(true, added, "Question Successfully Added In Data Base")
      );
  } catch (error) {
    res.status(500).json(new ApiResponse(false, null, error));
  }
};

const questionGetAll = async (req, res) => {
  let query = req.query;

  const limit = query.limit || 100;
  const skip = query.skip || 0;
  const select = query.select ? query.select.split(",").join(" ") : null;
  
  let filterQuery = { ...query };
  ["skip", "limit", "select", "sort"].forEach((key) => {
     delete filterQuery[key];
  });
  
  try {
    const allQuestions = await Questions.find(filterQuery)
      .select(select)
      .skip(skip)
      .limit(limit);

      res.set("x-count",allQuestions.length)
    res
      .status(200)
      .json(
        new ApiResponse(true, allQuestions, "Question Successfully Fetched")
      );
  } catch (error) {
    res.status(500).json(new ApiResponse(false, null, error));
  }
};

const questionDelete = async (req, res) => {
  try {
    const deleted = await Questions.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res
        .status(404)
        .json(new ApiResponse(false, null, "Question not found"));
    res
      .status(200)
      .json(new ApiResponse(true, deleted, "Question Deleted Successfully"));
  } catch (error) {
    res.status(500).json(new ApiResponse(false, null, error));
  }
};

const questionUpdated = async (req, res) => {
  try {
    const updatedQuestion = req.body;
    console.log("usp", updatedQuestion);
    const updated = await Questions.findByIdAndUpdate(
      req.params.id,
      { $set: updatedQuestion },
      { new: true, runValidators: true }
    );

    if (!updated)
      return res
        .status(404)
        .json(new ApiResponse(false, null, "Question Not Update found"));
    res
      .status(200)
      .json(new ApiResponse(true, updated, "Question Updated Successfully"));
  } catch (error) {
    res.status(500).json(new ApiResponse(false, null, error.message));
  }
};

const questionGetById = async (req, res) => {
  try {
    const question = await Questions.findById(req.params.id);

    if (!question)
      return res
        .status(404)
        .json(new ApiResponse(false, null, "Question Not Update found"));
    res
      .status(200)
      .json(new ApiResponse(true, question, "Question Updated Successfully"));
  } catch (error) {
    res.status(500).json(new ApiResponse(false, null, error.message));
  }
};

module.exports = {
  questionAdd,
  questionGetAll,
  questionDelete,
  questionUpdated,
  questionGetById,
};
