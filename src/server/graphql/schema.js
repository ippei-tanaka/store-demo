import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLNonNull,
    //GraphQLInt
} from "graphql/type";
import {
    ProductType,
    //ProductInputType
} from "./product-type";
import ProductModel from "../mongodb/models/product";

const QueryType = new GraphQLObjectType({
    name: "QueryType",
    fields: {
        product: {
            type: ProductType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve: (_, {id}) => {
                return ProductModel.find({id}); //{id, name: "rrr", price: 433}
            }
        }
    }
});

/*
const MutationType = new GraphQLObjectType({
    name: "Mutation Type",
    //description: "These are the things we can change",
    fields: {
        createProduct: {
            type: ProductInputType,
            //description: "Delete an article with id and return the article that was deleted.",
            args: {
                //id: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve: (_, {product}) => {
                console.log(product);
                return [];
                //return new ProductModel(product).save();
            }
        }
    },
});
*/

const schema = new GraphQLSchema({
    query: QueryType,
    //mutation: MutationType
});

export default schema;