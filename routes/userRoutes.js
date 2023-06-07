const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.get('/home', userController.index)
router.post('/signup', userController.signUp)
router.post('/login', userController.login)
router.delete('/:id', userController.deleteUser)
router.put('/:id', userController.updateDetails)




module.exports = router