const express = require("express")
const { getPaper, getAllPaper } = require("../../controller/paperController")

const router = express.Router()


router.get("/",getAllPaper)
router.get("/:id",getPaper)




module.exports = router