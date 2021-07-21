const express = require('express');
const router = express.Router();
const virtualAccountController = require('../controller/virtual_account_controller')

router.get('/banks', virtualAccountController.getAllVABanks)
router.post('/create', virtualAccountController.createVirtualAccount)
router.post('/check/:id', virtualAccountController.getVirtualAccount)
router.post('/update/:id', virtualAccountController.updateVirtualAccount)
module.exports = router
