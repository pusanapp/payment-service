exports.pattern = {
    bca: {
        payment_type: 'bank_transfer',
        transaction_details: {
            order_id: '',
            gross_amount: 0
        },
        bank_transfer: {
            bank: 'bca'
        }
    },
    bni: {
        payment_type: 'bank_transfer',
        transaction_details: {
            order_id: '',
            gross_amount: 0
        },
        bank_transfer: {
            bank: 'bni'
        }
    },
    bri: {
        payment_type: 'bank_transfer',
        transaction_details: {
            order_id: '',
            gross_amount: 0
        },
        bank_transfer: {
            bank: 'bri'
        }
    },
    mandiri: {
        payment_type: 'echannel',
        transaction_details: {
            order_id: 'order-101ss',
            gross_amount: 44000
        },
        echannel: {
            bill_info1: 'Payment For:',
            bill_info2: 'debt'
        }
    },
    permata: {
        payment_type: 'permata',
        transaction_details: {
            order_id: 'order-101czz',
            gross_amount: 44000
        }
    },
    alfamart: {
        payment_type: 'cstore',
        transaction_details: {
            order_id: '',
            gross_amount: 0
        },
        cstore: {
            store: 'alfamart',
            message: 'Message ',
            alfamart_free_text_1: '1st row of receipt,',
            alfamart_free_text_2: 'This is the 2nd row,',
            alfamart_free_text_3: '3rd row. The end.'
        }
    }



}
