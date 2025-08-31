const express = require("express");
const {
  deletePaper,
  updatePaper,
  addPaper,
} = require("../../controller/paperController");

const router = express.Router();

router.post("/add", addPaper);
router.delete("/delete/:id", deletePaper);
router.patch("/update/:id", updatePaper);

module.exports = router;
