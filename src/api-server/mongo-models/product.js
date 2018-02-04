import mongoose, {Schema} from 'mongoose';

const schema = new Schema({
    name: String,
    price: Number,
    description: String,
    image: String,
});

export default mongoose.model('Product', schema);