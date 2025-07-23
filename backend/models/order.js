const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true 
    },
    items: [
        {
            itemId: { 
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Food',
                required: true 
            },
            quantity: { 
                type: Number, 
                required: true 
            },
        }
    ],
    totalAmount: { 
        type: Number, 
        required: true 
    },
    status: { 
        type: String, 
        enum: ['Pending', 'Preparing', 'Delivered', 'Cancelled'], 
        default: 'Pending' 
    },
    paymentScreenshot: { 
        type: String 
    }, 
    createdAt: { 
        type: Date, 
        default: Date.now() 
    },
    payment: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Order', orderSchema);