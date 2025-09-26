const ApiResponse = require("../utils/ApiResponse");
const paperModel = require("../model/paperModel");
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
    if (!paper)
      return res
        .status(400)
        .json(new ApiResponse(false, null, "Paper Not Created"));

    res
      .status(200)
      .json(new ApiResponse(true, paper, "Paper Successfully Created"));
  } catch (error) {
    return res.status(500).json(new ApiResponse(false, null, error.message));
  }
};

const getPaper = async (req, res) => {
  try {
    const paper = await paperModel.findOne({ _id: req.params.id });
    if (!paper)
      return res
        .status(404)
        .json(new ApiResponse(false, null, "Paper not found"));

    res
      .status(200)
      .json(new ApiResponse(true, paper, "Paper fetched Successfully "));
  } catch (error) {
    return res.status(500).json(new ApiResponse(false, null, error.message));
  }
};

const getAllPaper = async (req, res) => {
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

    delete query.limit;
    delete query.skip;
    delete query.select;
    delete query.sort;
    delete query.page;

    const papers = await paperModel
      .find(query)
      .select(select)
      .skip(skip)
      .limit(limit)
      .sort(sort);

    if (!papers)
      return res
        .status(404)
        .json(new ApiResponse(false, null, "Paper not found"));
    const total = await paperModel.countDocuments(query);
    res.set({ "X-Total-Count": total });
    res
      .status(200)
      .json(new ApiResponse(true, papers, "Papers fetched Successfully "));
  } catch (error) {
    return res.status(500).json(new ApiResponse(false, null, error.message));
  }
};

const deletePaper = async (req, res) => {
  try {
    const paper = await paperModel.findByIdAndDelete(req.params.id);
    if (!paper)
      return res
        .status(404)
        .json(new ApiResponse(false, null, "Paper not deleted found"));

    res
      .status(200)
      .json(new ApiResponse(true, paper, "Paper Deleted Successfully "));
  } catch (error) {
    return res.status(500).json(new ApiResponse(false, null, error.message));
  }
};

const updatePaper = async (req, res) => {
  try {
    const updates = req.body;
    const paper = await paperModel.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: updates },
      { new: true, runValidators: true }
    );
    if (!paper)
      return res
        .status(404)
        .json(new ApiResponse(false, null, "Paper Not Update"));

    res
      .status(200)
      .json(new ApiResponse(true, paper, "Paper Updated Successfully "));
  } catch (error) {
    return res.status(500).json(new ApiResponse(false, null, error.message));
  }
};

module.exports = { updatePaper, deletePaper, getAllPaper, getPaper, addPaper };
