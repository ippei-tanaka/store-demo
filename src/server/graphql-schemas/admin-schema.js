import {buildSchema} from "graphql";
import {ADMIN, SHOP} from "@/server/permissions";
import R from "ramda";

const graphql = (...args) => {
    const strings = R.dropLast(1, args[0]);
    const variables = R.drop(1, args);
    const string = strings.reduce((memory, value, index) => memory + value + variables[index], "") + R.last(args[0]);
    return buildSchema(string);
};

const schema = graphql`
    type Query {
        product(id: ID!): Product
        products: [Product]

        findUserById(id: ID!): User
        findUserByName(name: String!): User
        getAllUsers: [User]
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
        permissions: [Permission]!
    }

    input NewUserInput {
        name: String!
        password: String!
        permissions: [Permission]
    }
    
    input ExistingUserInput {
        name: String
        permissions: [Permission]
    }
    
    enum Permission {
        ${SHOP},
        ${ADMIN}
    }
`;

export default schema;