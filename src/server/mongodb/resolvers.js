import ProductModel from "./models/product";

export default
{
    product: async ({id}) => {
        return ProductModel.findById(id);
    },

    products: () => {
        return ProductModel.find();
    },

    createProduct: ({input}) => {
        const product = new ProductModel({...input});
        return product.save();
    }
};