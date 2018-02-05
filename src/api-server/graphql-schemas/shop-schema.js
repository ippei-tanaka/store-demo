import {ADMIN, SHOP} from '@/api-server/permissions';
import {graphql} from '@/api-server/template-string-tag';

const schema = graphql`
    type Query {
        getViewer: User
        findProductById(id: ID!): Product
        getAllProducts: [Product!]
        findOrderById(id: ID!): Order
        getAllOrders: [Order!]
    }

    type Mutation {
        placeOrder(input: [OrderItemInput!]): Order
        updateUser(input: ExistingUserInput!): User
    }

    type Product {
        id: ID!
        name: String!
        description: String!
        price: Int!
        image: String
    }

    type Order {
        id: ID!
        items: [OrderItem!]!
    }

    type OrderItem {
        productId: ID!
        quantity: Int!
    }

    input OrderItemInput {
        productId: ID!
        quantity: Int!
    }

    type User {
        id: ID!
        name: String!
    }

    input ExistingUserInput {
        name: String
        password: String
        oldPassword: String
    }

    enum Permission {
        ${SHOP},
        ${ADMIN}
    }
`;

export default schema;