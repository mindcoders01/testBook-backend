const { uploads } = require("../../config/multerConfig")
const { questionDelete, questionUpdated, questionAdd } = require("../../controller/questionController")

const router = require("express").Router()


router.delete('/delete/:id',questionDelete)
router.patch('/update/:id',questionUpdated)
router.post('/add',uploads.single("figure"),questionAdd)

module.exports = router