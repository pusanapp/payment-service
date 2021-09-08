const {coreApi} = require('../util/midtrans_config');
const crypto = require('crypto')
const axios = require("axios");
require('dotenv').config()

const createCharge = async (req,res) => {
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
                // const {data: response} = await axios.post(`http://116.193.191.200/transaction-service/api/v1/transaction/update/${data.order_id}`)
                // console.log(response)
            } else if (data.fraud_status === 'accept'){
                // TODO set transaction status on your databaase to 'success'
            }
        } else if (data.transaction_status === 'settlement'){
            // TODO set transaction status on your databaase to 'success'
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
    callbackPayment
}
