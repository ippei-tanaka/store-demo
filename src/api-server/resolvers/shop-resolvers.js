import ProductModel from '@/api-server/mongo-models/product';
import UserModel from '@/api-server/mongo-models/user';
import OrderModel from '@/api-server/mongo-models/order';
import {Types} from 'mongoose';

export default {
    getViewer: async (params, context = {user: {}}) => {
        return UserModel.findById(context.user.id);
    },

    findProductById: async ({id}) => {
        return ProductModel.findById(id);
    },

    getAllProducts: () => {
        return ProductModel.find();
    },

    findOrderById: async ({id}) => {
        return await OrderModel.findById(id);
    },

    getAllOrders: (_, context = {user: {}}) => {
        return OrderModel.find({
            userId: Types.ObjectId(context.user.id)
        });
    },

    updateUser: async ({input}, context = {user: {}}) => {
        const user = await UserModel.findById(context.user.id);
        Object.assign(user, input);
        return user.save();
    },

    placeOrder: async ({input = []}, context = {user: {}}) => {
        const order = new OrderModel({
            userId: context.user.id,
            items: input
        });
        return order.save();
    },
};