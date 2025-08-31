const {  studentGetById, studentDeleteById, studentUpdateById, studentProfileUpload, studentLogout } = require("../../controller/studentController");
const upload = require("../../config/multerConfig")

const router = require("express").Router();



router.delete('/delete/:id',studentDeleteById)
router.patch('/update/:id',studentUpdateById)
router.patch('/profileImg',upload.single("profile"),  studentProfileUpload)
router.post('/logout',studentLogout)
router.get('/:id',studentGetById)

module.exports = router;
