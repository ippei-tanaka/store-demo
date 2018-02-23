import {ADMIN, SHOP} from '@/api-server/permissions';
import {buildSchema} from 'graphql';

const schemaString = `
    type Query {
        findProductById(id: ID!): Product
        getAllProducts: [Product]

        findUserById(id: ID!): User
        findUserByName(name: String!): User
        getAllUsers: [User]
        
        getAllOrders: [Order]
        
        getAllMedia: [Medium]
    }

    type Mutation {
        createProduct(input: NewProductInput!): Product
        updateProduct(id: ID!, input: ExistingProductInput!): Product
        deleteProduct(id: ID!): Product

        createUser(input: NewUserInput!): User
        updateUser(id: ID!, input: ExistingUserInput!): User
        deleteUser(id: ID!): User
        
        deleteMedium(id: ID!): Medium
    }

    type Product {
        id: ID!
        name: String!
        description: String!
        price: Float!
        imageUrl: String
    }

    input NewProductInput {
        name: String!
        description: String!
        price: Float!
        imageUrl: String
    }

    input ExistingProductInput {
        name: String
        description: String
        price: Float
        imageUrl: String
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
    
    type Order {
        id: ID!
        userId: ID!
        items: [OrderItem]!
    }
    
    type OrderItem {
        productId: ID!
        quantity: Int!
    }
    
    type Medium {
        id: ID!
        type: String!
    }

    enum Permission {
        ${SHOP},
        ${ADMIN}
    }
`;

export default buildSchema(schemaString);