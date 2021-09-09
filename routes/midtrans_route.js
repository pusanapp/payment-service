const express = require('express');
const router = express.Router();
const midTransController = require('../controller/midtrans_controller')

router.post('/create/charge/transaction', midTransController.createPaymentTransaction)

module.exports = router
