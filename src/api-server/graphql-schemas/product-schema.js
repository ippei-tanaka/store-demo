import {buildSchema} from 'graphql';

const schemaString = `
    type Query {
        findProductById(id: ID!): Product
        getAllProducts: [Product!]
    }

    type Product {
        id: ID!
        name: String!
        description: String!
        price: Float!
        image: String
    }
`;

export default buildSchema(schemaString);