import jwt from "jsonwebtoken";
import crypto from "crypto";
import UserModel from "@/server/mongo-models/user";

const SECRET = crypto.randomBytes(24).toString("hex");

export default
{
    authorize: async ({input}) => {
        const {token} = input;
        let id;

        try {
            const decoded = jwt.verify(token, SECRET);
            id = decoded.id;
        } catch (e) {
            return {
                success: false,
                userId: null
            };
        }

        const user = await UserModel.findById(id);
        if (!user) {
            return {
                success: false,
                userId: null
            };
        }

        return {
            success: true,
            userId: id
        };
    },

    authenticate: async ({input}, context) => {
        const {username, password} = input;

        const user = await UserModel.findOne({name: username});
        if (user && await user.comparePassword(password))
        {
            const _context = context || {};
            const tokenOptions = _context.tokenOptions || {};
            return {
                token: jwt.sign({id: user.id}, SECRET, tokenOptions)
            };
        }

        return {token: null};
    }
};