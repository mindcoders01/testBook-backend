const router = require("express").Router();
const { isLoggedIn, isAdmin } = require("../middleware/authMiddleware");
const v1Router = require("./v1Routes")
const v2Router = require("./v2Routes")
const v3Router = require('./v3Router')


router.use("/v1",v1Router)//public
router.use("/v2",isLoggedIn,v2Router)
router.use("/v3",isAdmin,v3Router)

// router.use("/v4",superAdminCheck,v4Router)

module.exports = router