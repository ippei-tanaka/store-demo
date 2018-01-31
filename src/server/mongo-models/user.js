import mongoose, {Schema} from "mongoose";

const schema = new Schema({
    name: {
        type: String,
        unique: true
    },
    password: String
});

export default mongoose.model("User", schema);