import UserModel from "@/server/mongodb/models/user";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const SECRET = crypto.randomBytes(24).toString("hex");
const tokenOptions = {
    expiresIn: "10s"
};

export const authorize = async (token) => {
    let id;
    try {
        const decoded = jwt.verify(token, SECRET);
        id = decoded.id;
    } catch (e) {
        return false;
    }

    const user = await UserModel.findById(id);
    if (!user) {
        return false;
    }
    return user.id;
};

export const authenticate = async (username, password) => {
    const user = await UserModel.findOne({name: username});
    if (user) {
        return jwt.sign({id: user.id}, SECRET, tokenOptions);
    }
    return false;
};