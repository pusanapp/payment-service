const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const virtualAccountRouter = require('./routes/virtual_account_route')
const invoiceRouter = require('./routes/invoice_route')
const midTransRouter = require('./routes/midtrans_route')
const shippingRouter = require('./routes/shipping_route')
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/v1/va', virtualAccountRouter);
app.use('/api/v1/invoice', invoiceRouter);
app.use('/api/v1/midtrans', midTransRouter);
app.use('/api/v1/shipping', shippingRouter);

module.exports = app;
