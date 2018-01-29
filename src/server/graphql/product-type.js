import {
    GraphQLInt,
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLInputObjectType
} from "graphql/type";

export const ProductType = new GraphQLObjectType({
    name: "Product",
    fields: {
        id: {type: new GraphQLNonNull(GraphQLString)},
        name: {type: new GraphQLNonNull(GraphQLString)},
        price: {type: new GraphQLNonNull(GraphQLInt)}
        // id: {type: GraphQLString},
        // name: {type: GraphQLString},
        // price: {type: GraphQLInt}
    }
});

export const ProductInputType = new GraphQLInputObjectType({
    name: "ProductInput",
    fields: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        price: {type: new GraphQLNonNull(GraphQLInt)}
        //id: {type: GraphQLInt},
        //slug: {type: new GraphQLNonNull(GraphQLString)},
        //title: {type: new GraphQLNonNull(GraphQLString)},
        //body: {type: GraphQLString},
        //status: {type: new GraphQLNonNull(ArticleStatusEnum)},
        //relatedArticles: {type: new GraphQLList(ArticleInputType)}
    }
});