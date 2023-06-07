const express = require('express')
const router = express.Router()
const blogController = require('../controllers/blogController')



router.get('/', blogController.index)
router.get('/blog/create')
router.post('/blog/create', blogController.create)
router.delete('/blog/:id', blogController.delete_Blog)
router.put('/blog/:id', blogController.update)

module.exports = router