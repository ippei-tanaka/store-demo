import mongoose, {Schema} from 'mongoose';
//import {verifyProductName, verifyProductDescription, verifyProductPrice} from '@/validator';

const schema = new Schema({
    type: {
        type: String,
        required: true,
        /*
        validate: {
            isAsync: true,
            validator: (value, callback) => {
                const error = verifyProductName(value);
                callback(!error, error ? error.message : '');
            },
        }
        */
    },
    binary: {
        type: Buffer,
        required: true,
        /*
        validate: {
            isAsync: true,
            validator: (value, callback) => {
                const error = verifyProductPrice(value);
                callback(!error, error ? error.message : '');
            },
        }
        */
    }
});

export default mongoose.model('Medium', schema);