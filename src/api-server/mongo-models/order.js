import mongoose, {Schema} from 'mongoose';
import isNull from 'lodash/isNull';

const OrderItemSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        require: true,
        default: null,
        validate: {
            validator: (v) => typeof v === 'object' && !isNull(v)
        },
    },
    quantity: {
        type: Number,
        require: true,
        default: 0,
        validate: {
            validator: (v) => v === Number.parseInt(v) && v > 0,
        },
    },
}, { _id : false });

const schema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        require: true,
        default: null,
        validate: {
            validator: (v) => typeof v === 'object' && !isNull(v)
        },
    },
    items: {
        type: [OrderItemSchema],
        require: true,
        default: [],
        validate: {
            validator: (items) => Array.isArray(items) && items.length > 0,
        },
    },
});

export default mongoose.model('Order', schema);