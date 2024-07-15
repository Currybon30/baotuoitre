import mongoose from 'mongoose';
const HistorySchema = new mongoose.Schema({
    orderId: {
        type: String,
        trim: true,
    },
    customerName: {
        type: String,
        trim: true,
    },
    address: {
        type: String,
        trim: true,
    },
    content: {
        type: String,
        trim: true,
    },
    productType:{
        type: String,
        trim: true,
        default: 'MT',
        enum: ['MT', 'TQ', 'Online']
    },
    size: {
        type: mongoose.Schema.Types.Decimal128,
        trim: true,
    },
    publishDates: [{
        type: Date
    }],
    quantity: {
        type: Number,
        trim: true,
    }, // Quantity automatically added after choosing the date
    pricePerUnit: {
        type: Number,
        trim: true,
    },
    total: {
        type: Number,
        trim: true,
    }, // Total automatically calculated (product of quantity and pricePerUnit)
    createAt: {
        type: Date,
        default: Date.now,
        expires: 60*60*24*30 // 30 days
    }
})

const History = mongoose.model('History', HistorySchema, 'history');

export default History