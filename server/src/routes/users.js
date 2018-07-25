let express = require('express');
let UserController = require('../controllers/UserController');

var router = express.Router();

router.get('/clients', UserController.getClients);
router.get('/admin', UserController.getAdmin);

module.exports = router;