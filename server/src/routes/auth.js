let express = require('express');
let AuthController = require('../controllers/AuthController');

var router = express.Router();

router.post('/check', AuthController.authenticate);

module.exports = router;