import {buildSchema} from "graphql";

const graphql = strings => buildSchema(strings[0]);

const schema = graphql`
    type Query {
        product(id: ID!): Product
        products: [Product]
    }

    type Mutation {
        createProduct(input: ProductInput!): Product
        updateProduct(id: ID!, input: ProductInput!): Product
        deleteProduct(id: ID!): Product

        createUser(input: UserInput!): User
    }

    type Product {
        id: ID!
        name: String!
        price: Int!
    }

    input ProductInput {
        name: String!
        price: Int!
    }
    
    type User {
        id: ID!
        name: String!
    }

    input UserInput {
        name: String!
        password: String!
    }
`;

export default schema;