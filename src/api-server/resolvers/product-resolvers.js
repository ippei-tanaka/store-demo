import ProductModel from '@/api-server/mongo-models/product';

export default {
    findProductById: async ({id}) => {
        return ProductModel.findById(id);
    },

    getAllProducts: () => {
        return ProductModel.find();
    },
};