const express = require("express")
const { questionGetById, questionGetAll, questionAdd } = require("../../controller/questionController")
const { uploads } = require("../../config/multerConfig")
const router = express.Router()

router.get("/",questionGetAll)
router.post('/add',uploads.single("figure"),questionAdd)
router.get('/:id',questionGetById)



module.exports = router