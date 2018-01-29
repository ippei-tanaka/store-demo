import ProductModel from "../mongodb/models/product";

export default
{
    product: ({id}) => {
        return ProductModel.find({id});
    },

    products: () => {
        return ProductModel.find({});
    },

    createProduct: ({input}) => {
        const product = new ProductModel({...input});
        return product.save();
    }
};