let express = require('express');
let ActionController = require('../controllers/ActionController');

var router = express.Router();

router.get('/', ActionController.getActions);

module.exports = router;