const express = require('express');
const router = express.Router();
const shippingController = require('../controller/shipping_controller')

router.get('/all', shippingController.getAllShippingMethod)
router.get('/all/senapan', shippingController.getAllSenapanShippingMethod)
module.exports = router
