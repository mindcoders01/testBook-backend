const router = require("express").Router();
const adminRouter = require('../router/v3/adminRouter')
const studentRouter = require('../router/v3/studentRoutes')



router.use("/student",studentRouter)
router.use("/admin",adminRouter)

module.exports = router;
