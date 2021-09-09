const {coreApi} = require('../util/midtrans_config');
const crypto = require('crypto')
const axios = require("axios");
require('dotenv').config()
const {pattern} = require('../util/midtrans_charge_pattern')
const model = require("../models/index");
const Payment = model.app_payment;

const createPaymentTransaction = async (req, res) =>{
    const data = req.body;
    const midTransBody = pattern[data.payment_method]
    midTransBody.transaction_details.order_id = data.order_id
    midTransBody.transaction_details.gross_amount = data.amount
    try {
        const resp = await coreApi.charge(midTransBody)
        console.log(resp)
        const transactionTime = new Date(resp.transaction_time);
        const expirationDate = new Date(transactionTime);
        expirationDate.setDate(transactionTime.getDate()+1);
        const saveData = {
            transaction_id: data.transaction_id,
            invoice_number: data.order_id,
            payment_method: data.payment_method,
            amount: parseInt(resp.gross_amount),
            expiration_date: expirationDate.toLocaleString(),
            midtrans_id: resp.transaction_id
        }
        if(data.payment_method ==='bca' || data.payment_method === 'bni' || data.payment_method === 'bri'){
            saveData.payment_number = resp.va_numbers[0].va_number
        }else if (data.payment_method ==='mandiri'){
            saveData.payment_number = resp.bill_key
        }else if (data.payment_method ==='permata'){
            saveData.payment_number = resp.permata_va_number
        }else if (data.payment_method === 'alfamart'){
            saveData.payment_number = resp.payment_code
        }
        console.log(saveData)
        await Payment.create(saveData).then(result=>{
            res.send({
                status: true,
                message: 'virtual account payment created',
                data: result
            })
        })
        // res.send({
        //     data: saveData
        // })
    }catch (e) {
        res.status(400).send({
            status: false,
            message: e.message
        })
    }
}
const createCharge = async (req,res) => {
    console.log(req.body)
    await coreApi.charge(req.body).then(chargeResponse=>{
        console.log(chargeResponse)
        res.send({data: chargeResponse})
    }).catch(err=>{
        res.send({
            err: err.message
        })
    })
}

const getTransactionStatus = async (req,res) => {

    await coreApi.transaction.status(req.params.id).then(response=>{
        console.log(response)
        res.send({data: response})
    }).catch(err=>{
        res.send({
            err: err.message
        })
    })
}

const cancelTransaction = async (req,res) => {
    await coreApi.transaction.cancel(req.params.id).then(response=>{
        console.log(response)
        res.send({data: response})
    }).catch(err=>{
        res.send({
            err: err.message
        })
    })
}

const callbackPayment = async (req, res) => {
    const data = req.body;
    console.log(data.gross_amount)
    console.log(parseInt(data.gross_amount))
    console.log(data)
    const signatureRaw = `${data.order_id}${data.status_code}${data.gross_amount}${process.env.MIDTRANS_SERVER_KEY}`
    const signatureHash = crypto.createHash('sha512').update(signatureRaw).digest('hex');
    console.log(signatureHash)
    console.log(data.signature_key)
    console.log('sha| ', signatureHash === data.signature_key)
    if(signatureHash === data.signature_key){
        if (data.transaction_status === 'capture'){
            // capture only applies to card transaction, which you need to check for the fraudStatus
            if (data.fraud_status === 'challenge'){

            } else if (data.fraud_status === 'accept'){
                // TODO set transaction status on your databaase to 'success'
                const {data: response} = await axios.post(`https://pusanair-dev.xyz/transaction-service/api/v1/transaction/update/${data.order_id}`)
                console.log(response)
            }
        } else if (data.transaction_status === 'settlement'){
            const {data: response} = await axios.post(`https://pusanair-dev.xyz/transaction-service/api/v1/transaction/update/${data.order_id}`)
            console.log(response)
        } else if (data.transaction_status === 'deny'){
            // TODO you can ignore 'deny', because most of the time it allows payment retries
            // and later can become success
        } else if (data.transaction_status === 'cancel' || data.transaction_status === 'expire'){
            // TODO set transaction status on your databaase to 'failure'
        } else if (data.transaction_status === 'pending'){
            // TODO set transaction status on your databaase to 'pending' / waiting payment
        }
        res.status(200).send({data: data})

    }else {
        res.status(401).send({
            status: false,
            message: 'Signature Key Not Valid'
        })
    }
}

module.exports = {
    createCharge,
    getTransactionStatus,
    callbackPayment,
    createPaymentTransaction
}
