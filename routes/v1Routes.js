const router = require("express").Router()
const authRouter = require("../router/v1/authRouter")
const studentRouter = require("../router/v1/studentRouter")

//end points
router.use("/auth",authRouter)
router.use("/student",studentRouter)
// router.use("/question")
// router.use("/paper")

module.exports = router
