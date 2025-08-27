const {  studentGetById, studentDeleteById, studentUpdateById } = require("../../controller/studentController");

const router = require("express").Router();



router.delete('/delete/:id',studentDeleteById)
router.patch('/update/:id',studentUpdateById)
router.get('/:id',studentGetById)

module.exports = router;
