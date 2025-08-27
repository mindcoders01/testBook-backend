const express = require('express');
const { getAdminDetails, updateAdminDetails, deleteAdminInfo } = require('../../controller/adminController');

const router = express.Router()



router.get("/:id", getAdminDetails);
router.get("/update/:id",updateAdminDetails)
router.use("/delete/:id", deleteAdminInfo);


module.exports = router