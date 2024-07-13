import mongoose from 'mongoose';
const HistorySchema = new mongoose.Schema({
    orderId: {
        type: String,
        trim: true,
        required: 'Phiếu yêu cầu không được để trống',
    },
    customerName: {
        type: String,
        trim: true,
        required: 'Tên khách hàng không được để trống',
    },
    address: {
        type: String,
        trim: true,
        required: 'Địa chỉ không được để trống',
    },
    content: {
        type: String,
        trim: true,
        required: "Nội dung không được để trống",
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
        required: "Kích thước không được để trống",
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
        required: "Đơn giá không được để trống",
    },
    total: {
        type: Number,
        trim: true,
    }, // Total automatically calculated (product of quantity and pricePerUnit)
})

const History = mongoose.model('History', HistorySchema, 'history');

export default History