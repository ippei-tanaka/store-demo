import mongoose, {Schema} from "mongoose";

const schema = new Schema({
    name: String,
    password: String
});

export default mongoose.model("User", schema);