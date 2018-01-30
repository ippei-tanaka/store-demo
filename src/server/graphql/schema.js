import {buildSchema} from "graphql";

const graphql = strings => buildSchema(strings[0]);

const schema = graphql`
    type Query {
        product(id: ID!): Product
        products: [Product]

        user(id: ID!): User
        users: [User]
    }

    type Mutation {
        createProduct(input: ProductInput!): Product
        updateProduct(id: ID!, input: ProductInput!): Product
        deleteProduct(id: ID!): Product

        createUser(input: NewUserInput!): User
        updateUser(id: ID!, input: ExistingUserInput!): User
        deleteUser(id: ID!): User
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

    input NewUserInput {
        name: String!
        password: String!
    }
    
    input ExistingUserInput {
        name: String
    }
`;

export default schema;