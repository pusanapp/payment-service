const Xendit = require('xendit-node');
require('dotenv').config()
const x = new Xendit({
    secretKey: process.env.XENDIT_SECRET,
});

module.exports = x
