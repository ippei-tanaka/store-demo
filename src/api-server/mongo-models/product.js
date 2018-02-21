import mongoose, {Schema} from 'mongoose';
import {verifyProductName, verifyProductDescription, verifyProductPrice} from '@/validator';

const schema = new Schema({
    name: {
        type: String,
        required: true,
        validate: {
            isAsync: true,
            validator: (value, callback) => {
                const error = verifyProductName(value);
                callback(!error, error ? error.message : '');
            },
        }
    },
    price: {
        type: Number,
        required: true,
        validate: {
            isAsync: true,
            validator: (value, callback) => {
                const error = verifyProductPrice(value);
                callback(!error, error ? error.message : '');
            },
        }
    },
    description: {
        type: String,
        required: true,
        validate: {
            isAsync: true,
            validator: (value, callback) => {
                const error = verifyProductDescription(value);
                callback(!error, error ? error.message : '');
            },
        }
    },
    imageUrl: String,
});

export default mongoose.model('Product', schema);