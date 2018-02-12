import mongoose, {Schema} from 'mongoose';

const OrderItemSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        require: true
    },
    quantity: {
        type: Number,
        require: true,
        validate: {
            validator: (v) => v === Number.parseInt(v) && v > 0,
        },
    },
}, { _id : false });

const schema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        require: true
    },
    items: {
        type: [OrderItemSchema],
        require: true,
        validate: {
            validator: (items) => Array.isArray(items) && items.length > 0,
        },
    },
});

export default mongoose.model('Order', schema);