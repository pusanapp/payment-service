const model = require('../models/index')
const Shipping = model.shipping_method;
const PaymentStep = model.payment_step;
const getAllShippingMethod = async (req, res) => {
    await Shipping.findAll({}).then(data=>{
        res.send({
            status: true,
            message: 'get all shipping method',
            data: data
        })
    }).catch(err=>{
        res.send({
            status: false,
            message: err.message
        })
    })
}

const getAllSenapanShippingMethod = async (req, res)=>{
    await Shipping.findAll({
        where: {
            senapan: true
        }
    }).then(data=>{
        res.send({
            status: true,
            message: 'get all senapan shipping method',
            data: data
        })
    }).catch(err=>{
        res.send({
            status: false,
            message: err.message
        })
    })
}

const getPaymentStep = async (req, res) => {
    const paymentMethod = req.params.method;
    const paymentNumber = req.params.payment_number;
    await PaymentStep.findAll({
        where: {
            payment_method: paymentMethod,
        }
    }).then(steps=>{
        const newData = []
        steps.map(step=>{
            step.content = step.content.replace('[payment_number]',paymentNumber)
            newData.push(step)
            if(newData.length === steps.length){
                res.send({
                    status: true,
                    message: 'get payment method '+paymentMethod,
                    data: newData
                })
            }
        })
    }).catch(err=>{
        res.send({
            status: false,
            message: err.message
        })
    })
}

module.exports = {
    getAllSenapanShippingMethod,
    getAllShippingMethod,
    getPaymentStep
}
