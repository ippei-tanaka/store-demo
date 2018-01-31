import mongoose, {Schema, Error} from "mongoose";
import bcrypt from "bcrypt";

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
    /*
    password: {
        type: String,
        min: 8,
        max: 20,
        validate: {
            validator: (v) => /^[a-zA-Z0-9_\-@!#%&*+]+$/.test(v)
        }
    },
    */
    hashed_password: {
        //required: true,
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

const validatePassword = (value) => {
    if (typeof value !== "string") return false;
    if (!/^[a-zA-Z0-9_\-@!#%&*+]+$/.test(value)) return false;
    if (value.length > 20) return false;
    if (value.length < 8) return false;
    return true;
};

schema.pre("save", async function (next) {
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

export default mongoose.model("User", schema);