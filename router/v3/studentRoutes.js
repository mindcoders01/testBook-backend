const express = require('express')
const { studentsGetAll } = require('../../controller/studentController')
const router = express.Router()



router.get('/',studentsGetAll)

module.exports = router