import mongoose, {Schema, Error} from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import bcrypt from "bcrypt";
import validator from "validator";
import R from "ramda";

const SALT_WORK_FACTOR = 10;

const schema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        min: 4,
        max: 50,
        validate: {
            validator: (v) => /^[a-zA-Z][a-zA-Z0-9_\-@!#%&*+]+$/.test(v)
        }
    },
    hashed_password: {
        required: true,
        type: String
    }
});

schema.virtual("password")
    .set(function (value) {
        this._password = value;
    })
    .get(function () {
        return this._password;
    });

const validatePassword = R.allPass([
    (v) => typeof v === "string",
    (v) => validator.isLength(v, {min:8, max:20}),
    (v) => validator.matches(v, /^[a-zA-Z0-9_\-@!#%&*+]+$/)
]);

schema.pre("validate", async function (next) {
    const password = this.password;
    if (!password) return next();
    if (!validatePassword(password)) return next(new Error.ValidationError("wrong!"));
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.hashed_password = await bcrypt.hash(password, salt);
    next();
});

schema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.hashed_password);
};

schema.plugin(uniqueValidator);

export default mongoose.model("User", schema);