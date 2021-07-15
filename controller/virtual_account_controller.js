
const { VirtualAcc } = require('../util/xendit_config');
const vaSpecificOptions = {};
const va = new VirtualAcc(vaSpecificOptions);

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
        console.log(resp)
        res.send({
            data: resp
        })
    }catch (e) {
        res.send({err: e.message})
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
    const data = req.body.data
}

module.exports = {
    getAllVABanks,
    createVirtualAccount,
    getVirtualAccount,
    updateVirtualAccount
}
