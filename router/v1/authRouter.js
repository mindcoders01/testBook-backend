const { registerAdmin, loginAdmin } = require("../../controller/adminController");
const { studentRegister, studentLogin } = require("../../controller/studentController");
const {uploads} = require("../../config/multerConfig")
const router = require("express").Router();


router.post("/student/register",uploads.single("profile"), studentRegister);
router.post("/admin/register",registerAdmin)
router.post("/admin/login",loginAdmin)
router.post("/student/login",studentLogin)

module.exports = router;
                         