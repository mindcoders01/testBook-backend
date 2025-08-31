const router = require("express").Router();
const adminRouter = require('../router/v3/adminRouter')
const studentRouter = require('../router/v3/studentRoutes')
const questionRouter = require('../router/v3/questionRouter')
const  paperRouter = require("../router/v3/paperRouter")



router.use("/student",studentRouter)
router.use("/admin",adminRouter)
router.use("/question",questionRouter)
router.use("/paper",paperRouter)

module.exports = router;
