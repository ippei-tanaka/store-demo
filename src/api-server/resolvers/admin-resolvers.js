import ProductModel from '@/api-server/mongo-models/product';
import UserModel from '@/api-server/mongo-models/user';

export default {
    findProductById: async ({id}) => {
        return ProductModel.findById(id);
    },

    getAllProducts: () => {
        return ProductModel.find();
    },

    createProduct: ({input}) => {
        const product = new ProductModel({...input});
        return product.save();
    },

    updateProduct: async ({id, input}) => {
        const product = await ProductModel.findById(id);
        Object.assign(product, input);
        return product.save();
    },

    deleteProduct: async ({id}) => {
        const product = await ProductModel.findById(id);
        return product.remove();
    },

    findUserById: ({id}) => {
        return UserModel.findById(id);
    },

    findUserByName: ({name}) => {
        return UserModel.findOne({name});
    },

    getAllUsers: () => {
        return UserModel.find();
    },

    createUser: ({input}) => {
        const user = new UserModel({...input});
        return user.save();
    },

    updateUser: async ({id, input}) => {
        const user = await UserModel.findById(id);
        Object.assign(user, input);
        return user.save();
    },

    deleteUser: async ({id}) => {
        const user = await UserModel.findById(id);
        return user.remove();
    },
};