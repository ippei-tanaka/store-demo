import mongoose, {Schema} from "mongoose";
//import passportLocalMongoose from "passport-local-mongoose";

const schema = new Schema({
    name: {
        type: String,
        unique: true
    },
    password: String
});

/*
schema.plugin(passportLocalMongoose, {
    usernameField: "name",
    usernameUnique: true
});
*/

export default mongoose.model("User", schema);