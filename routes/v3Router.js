const router = require("express").Router();
const adminRouter = require('../router/v3/adminRouter')
const studentRouter = require('../router/v3/studentRoutes')
const questionRouter = require('../router/v3/questionRouter')



router.use("/student",studentRouter)
router.use("/admin",adminRouter)
router.use("/question",questionRouter)

module.exports = router;
