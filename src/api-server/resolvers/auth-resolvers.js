import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import UserModel from '@/api-server/mongo-models/user';

const SECRET = crypto.randomBytes(24).toString('hex');
const DEFAULT_TOKEN_OPTIONS = {
    //expiresIn: '10s'
    expiresIn: '1h'
};

export default {
    verifyToken: async ({input}) => {
        const {token} = input;
        let id;

        try {
            const decoded = jwt.verify(token, SECRET);
            id = decoded.id;
        } catch (e) {
            return {
                isValid: false,
                userId: null,
            };
        }

        const user = await UserModel.findById(id);
        if (!user) {
            return {
                isValid: false,
                user,
            };
        }

        return {
            isValid: true,
            user,
        };
    },

    authenticate: async ({input}, context = {}) => {
        const {username, password} = input;

        const user = await UserModel.findOne({name: username});
        if (user && await user.comparePassword(password)) {
            const tokenOptions = {...DEFAULT_TOKEN_OPTIONS, ...context.tokenOptions};
            return {
                token: jwt.sign({id: user.id}, SECRET, tokenOptions),
            };
        }

        return {token: null};
    },
};