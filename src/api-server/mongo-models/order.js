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
});

const schema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        require: true
    },
    items: {
        type: [OrderItemSchema],
        require: true
    },
});

export default mongoose.model('Order', schema);