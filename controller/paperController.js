const ApiResponse = require("../utils/ApiResponse");

const paperModel = require();
const addPaper = async (req, res) => {
  try {
    const { name, question, exam, figure, note, duration, isPaid } = req.body;

    const paper = await paperModel.create({
      name,
      question,
      exam,
      figure,
      note,
      duration,
      isPaid,
    });
    if (!paper) return res.status(400).json(false, null, "Paper Not Created");

    res
      .status(200)
      .json(ApiResponse(true, paper, "Paper Successfully Created"));
  } catch (error) {
    return res.status(500).json(false, null, error.message);
  }
};

const getPaper = async (req, res) => {
  try {
    const paper = await paperModel.findOneById(req.params.id);
    if (!paper) return res.status(404).json(false, null, "Paper not found");

    res
      .status(200)
      .json(ApiResponse(true, paper, "Paper fetched Successfully "));
  } catch (error) {
    return res.status(500).json(false, null, error.message);
  }
};

const getAllPaper = async (req, res) => {
  try {
    const papers = await paperModel.find();
    if (!papers) return res.status(404).json(false, null, "Paper not found");

    res
      .status(200)
      .json(ApiResponse(true, paper, "Papers fetched Successfully "));
  } catch (error) {
    return res.status(500).json(false, null, error.message);
  }
};

// const  deletePaper = async (r)