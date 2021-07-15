const express = require('express');
const router = express.Router();
const invoiceRouter = require('../controller/invoice_controller')
router.post('/create', invoiceRouter.createInvoice)
router.post('/callback', invoiceRouter.callBacksInvoicePayment)

module.exports = router
