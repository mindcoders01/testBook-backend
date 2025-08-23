const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("<h1>server is Live</h1>");
});
// router.use("/v1",v1Router)
// router.use("/v2",isloggedIn,v2Router)
// router.use("/v3",adminCheck,v3Router)

// router.use("/v4",superAdminCheck,v4Router)

module.exports = router