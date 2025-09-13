const {  studentGetById, studentDeleteById, studentUpdateById, studentProfileUpload, studentLogout } = require("../../controller/studentController");
const {uploads} = require("../../config/multerConfig")

const router = require("express").Router();



router.delete('/delete/:id',studentDeleteById)
router.patch('/update/:id',studentUpdateById)
router.patch('/profileImg',uploads.single("profile"),  studentProfileUpload)
router.post('/logout',studentLogout)
router.get('/:id',studentGetById)

module.exports = router;
