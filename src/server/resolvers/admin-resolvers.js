import ProductModel from "@/server/mongo-models/product";
import UserModel from "@/server/mongo-models/user";

export default {
    product: async ({id}) => {
        return ProductModel.findById(id);
    },

    products: () => {
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

    findUserByName: ({name}) => {
        return UserModel.findOne({name});
    },

    user: ({id}) => {
        return UserModel.findById(id);
    },

    users: () => {
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
    }
};