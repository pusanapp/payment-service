require('dotenv').config()
const { Invoice } = require('../util/xendit_config');
const invoiceSpecificOptions  = {};
const invoice = new Invoice(invoiceSpecificOptions);

const createInvoice = async (req, res) => {
    try {
        const resp = await invoice.createInvoice(req.body);
        console.log(resp);
        res.send(resp)
    }catch (e) {
        res.send({err: e.message})
    }


}

const callBacksInvoicePayment = async (req,res) =>{
    console.log("PAYMENT RECEIVED")
    const data = req.body;
    res.send({
        data: data
    })


}

module.exports = {
    createInvoice,
    callBacksInvoicePayment
}
