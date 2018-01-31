import mongoose, {Schema} from "mongoose";

const schema = new Schema({
    name: String,
    price: Number
});

export default mongoose.model("Product", schema);