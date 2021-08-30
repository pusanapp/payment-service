const model = require('../models/index')
const { VirtualAcc } = require('../util/xendit_config');
const axios = require("axios");
const vaSpecificOptions = {};
const va = new VirtualAcc(vaSpecificOptions);
const Payment = model.app_payment;

const getAllVABanks = async (req,res) => {
    try {


        const resp = await va.getVABanks();
        console.log(resp);
        res.send({
            data: resp
        })
    }catch (e) {
        res.send({err: e.message})
    }
}

const createVirtualAccount = async (req,res)=>{
    const data = req.body;
    try {
        const resp = await va.createFixedVA({
            externalID: data.external_id,
            bankCode: data.bank_code,
            name: data.name,
            isClosed: true,
            expectedAmt: data.amount,
            isSingleUse: true
        })
        const saveData = {
            transaction_id: data.transaction_id,
            invoice_number: data.external_id,
            payment_method: resp.bank_code,
            payment_number: resp.account_number,
            amount: resp.expected_amount,
            expiration_date: resp.expiration_date,
            xendit_id: resp.id
        }
        await Payment.create(saveData).then(result=>{
            res.send({
                status: true,
                message: 'virtual account payment created',
                data: result
            })
        })
        // res.send({
        //
        //     data: resp
        // })
    }catch (e) {
        res.send({
            status: true,
            message: e.message
        })
    }

}

const getVirtualAccount = async (req,res) => {
    const id = req.params.id;
    const resp = await va.getFixedVA({ id: id });
    console.log(resp);
    res.send({
        data: resp
    })
}

const updateVirtualAccount = async (req,res) => {
    const id = req.params.id;
    console.log(id)
    const amount = req.body.amount;
    console.log(amount)
    try {

        const resp = await va.updateFixedVA({
            id: id,
            expectedAmt: amount,
        })
        res.send({
            data: resp
        })
    }catch (e) {
        res.send({err: e.message})
    }

}

const callbackPayment = async (req, res) => {
    const token = req.headers['x-callback-token']
    if(token){
        console.log("PAYMENT RECEIVED")
        const data = req.body;
        const {data: response} = await axios.post(`http://116.193.191.200/transaction-service/api/v1/transaction/update/${data.external_id}`)
        console.log(response)
        //update transaction payment status
        res.send({
            data: data
        })
    }else {
        res.status(401).send({
            err: 'token not found'
        })
    }
}

module.exports = {
    getAllVABanks,
    createVirtualAccount,
    getVirtualAccount,
    updateVirtualAccount,
    callbackPayment
}
