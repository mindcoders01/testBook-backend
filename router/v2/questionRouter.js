const express = require("express")
const { questionDelete, questionUpdated, questionGetById, questionGetAll, questionAdd } = require("../../controller/questionController")
const router = express.Router()


router.delete('/delete/:id',questionDelete)
router.patch('/update/:id',questionUpdated)
router.get("/",questionGetAll)
router.post('/add',questionAdd)
router.get('/:id',questionGetById)



module.exports = router