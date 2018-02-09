import {ADMIN, SHOP} from '@/api-server/permissions';
import {graphql} from '@/api-server/template-string-tag';

const schema = graphql`
    type Query {
        getMyself: User
        findOrderById(id: ID!): Order
        getAllOrders: [Order!]
    }

    type Mutation {
        placeOrder(input: [OrderItemInput!]): Order
        updateUser(input: ExistingUserInput!): User
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