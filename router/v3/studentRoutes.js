const express = require('express')
const { studentsGetAll } = require('../../controller/studentController')
const router = express.Router()



router.get('/all',studentsGetAll)

module.exports = router