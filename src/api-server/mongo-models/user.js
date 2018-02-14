import mongoose, {Schema, Error} from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import bcrypt from 'bcryptjs';
import validator from 'validator';
import overEvery from 'lodash/overEvery';

const SALT_WORK_FACTOR = 10;

const schema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        min: 4,
        max: 50,
        validate: {
            validator: (v) => /^[a-zA-Z][a-zA-Z0-9_\-@!#%&*+]+$/.test(v),
        },
    },
    permissions: {
        type: [String],
        required: true,
    },
    hashedPassword: {
        required: true,
        type: String,
    },
});

schema.virtual('password').set(function(value) {
    this._password = value;
}).get(function() {
    return this._password;
});

schema.virtual('oldPassword').set(function(value) {
    this._oldPassword = value;
}).get(function() {
    return this._oldPassword;
});

const validatePassword = overEvery([
    (v) => typeof v === 'string',
    (v) => validator.isLength(v, {
        min: 8,
        max: 20,
    }),
    (v) => validator.matches(v, /^[a-zA-Z0-9_\-@!#%&*+]+$/),
]);

schema.pre('validate', async function(next) {
    const password = this.password;
    if (!password) return next();
    if (!validatePassword(password)) {
        return next(new Error.ValidationError('Password is incorrect'));
    }
    if (!this.isNew)
    {
        const oldPassword = this.oldPassword;
        if (!(await this.comparePassword(oldPassword)))
        {
            return next(new Error.ValidationError('Password is incorrect'));
        }
    }
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.hashedPassword = await bcrypt.hash(password, salt);
    next();
});

schema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.hashedPassword);
};

schema.plugin(uniqueValidator);

const UserModel = mongoose.model('User', schema);

export default UserModel;