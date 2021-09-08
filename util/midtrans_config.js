const axios = require("axios");
require('dotenv').config()

const auth = 'Basic ' + new Buffer(process.env.MIDTRANS_SERVER_KEY + ':').toString('base64');

const headers = {
    'Content-Type': 'application/json',
    'Authorization': auth,
    'Accept': 'application/json'
};

exports.instance = axios.create({
    baseURL: 'https://api.sandbox.midtrans.com',
    headers: headers
});

const midTransClient = require('midtrans-client');
// Create Snap API instance
exports.coreApi = new midTransClient.CoreApi({
    isProduction : false,
    serverKey : process.env.MIDTRANS_SERVER_KEY,
    clientKey : process.env.MIDTRANS_CLIENT_KEY
});

