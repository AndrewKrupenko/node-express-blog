const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

router.get('/', blogController.index);
router.post('/', blogController.store);
router.get('/create', blogController.create);
router.get('/:id', blogController.show);
router.delete('/:id', blogController.destroy);

module.exports = router;