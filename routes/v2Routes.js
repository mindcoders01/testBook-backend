const router = require("express").Router();
const studentRouter = require("../router/v2/studentRouter")
const adminRouter = require("../router/v2/adminRouter")
const questionRouter = require("../router/v2/questionRouter")

router.use("/student",studentRouter)
router.use("/admin",adminRouter)
router.use("/question",questionRouter)

module.exports = router;
