const model = require('../models/index')
const Shipping = model.shipping_method;

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

module.exports = {
    getAllSenapanShippingMethod,
    getAllShippingMethod
}
