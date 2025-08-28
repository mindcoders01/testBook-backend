const { questionDelete, questionUpdated, questionAdd } = require("../../controller/questionController")

const router = require("express").Router()


router.delete('/delete/:id',questionDelete)
router.patch('/update/:id',questionUpdated)
router.post('/add',questionAdd)

module.exports = router