import mongoose, {Schema} from 'mongoose';

const schema = new Schema({
    name: {
        type: String,
        required: true,
        min: 1,
        max: 50,
    },
    price: {
        type: Number,
        required: true,
        validate: {
            validator: (v) => v > 0,
        },
    },
    description: {
        type: String,
        required: true,
        min: 1,
        max: 300,
    },
    image: String,
});

export default mongoose.model('Product', schema);