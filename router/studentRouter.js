const express = require('express')
const { handleGetById, handleRegister, handlelogin, handleGetAll, handleDeleteById, handleUpdateById } = require('../controller/studentController')
const router = express.Router()


router.post('/register',handleRegister)
router.post('/login',handlelogin)
router.get('/getOne/:id',handleGetById)
router.get('/all',handleGetAll)
router.delete('/delete/:id',handleDeleteById)
router.patch('/update/:id',handleUpdateById)



module.exports = router 