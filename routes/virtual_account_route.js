const express = require('express');
const router = express.Router();
const virtualAccountController = require('../controller/virtual_account_controller')
const midTransController = require('../controller/midtrans_controller')

router.get('/banks', virtualAccountController.getAllVABanks)
router.post('/create', virtualAccountController.createVirtualAccount)
router.post('/check/:id', virtualAccountController.getVirtualAccount)
router.post('/update/:id', virtualAccountController.updateVirtualAccount)
router.post('/payment/callback', virtualAccountController.callbackPayment)
router.post('/tes', midTransController.createCharge)
router.get('/tes/:id', midTransController.getTransactionStatus)
router.post('/tes/callback', midTransController.callbackPayment)
module.exports = router
