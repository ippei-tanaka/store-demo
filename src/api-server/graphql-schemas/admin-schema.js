import {ADMIN, SHOP} from '@/api-server/permissions';
import {buildSchema} from 'graphql';

const schemaString = `
    type Query {
        findProductById(id: ID!): Product
        getAllProducts: [Product]

        findUserById(id: ID!): User
        findUserByName(name: String!): User
        getAllUsers: [User]
    }

    type Mutation {
        createProduct(input: NewProductInput!): Product
        updateProduct(id: ID!, input: ExistingProductInput!): Product
        deleteProduct(id: ID!): Product

        createUser(input: NewUserInput!): User
        updateUser(id: ID!, input: ExistingUserInput!): User
        deleteUser(id: ID!): User
    }

    type Product {
        id: ID!
        name: String!
        description: String!
        price: Float!
        image: String
    }

    input NewProductInput {
        name: String!
        description: String!
        price: Float!
        image: String
    }

    input ExistingProductInput {
        name: String
        description: String
        price: Float
        image: String
    }

    type User {
        id: ID!
        name: String!
        permissions: [Permission]!
    }

    input NewUserInput {
        name: String!
        password: String!
        permissions: [Permission]
    }

    input ExistingUserInput {
        name: String
        password: String
        oldPassword: String
        permissions: [Permission]
    }

    enum Permission {
        ${SHOP},
        ${ADMIN}
    }
`;

export default buildSchema(schemaString);