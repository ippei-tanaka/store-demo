import ProductModel from "./models/product";

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
    }
};