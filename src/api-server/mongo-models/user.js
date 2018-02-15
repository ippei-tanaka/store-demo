import mongoose, {Schema, Error} from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import bcrypt from 'bcryptjs';
import {verifyUserName, validatePassword} from '@/validator';

const SALT_WORK_FACTOR = 10;

const schema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        validate: {
            isAsync: true,
            validator: (value, callback) => {
                const error = verifyUserName(value);
                callback(!error, error ? error.message : '');
            }
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

schema.pre('validate', async function(next) {
    const password = this.password;
    if (!password) return next();
    const error = validatePassword(password);
    if (error) {
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