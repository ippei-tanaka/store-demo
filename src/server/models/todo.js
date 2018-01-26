import mongoose, {Schema} from "mongoose";

const toDoSchema = new Schema({
    itemId: Number,
    item: String,
    completed: Boolean
}, {collection:"TodoList"});

export default mongoose.model("ToDo", toDoSchema);