import {graphql} from '@/api-server/template-string-tag';

const schema = graphql`
    type Query {
        findProductById(id: ID!): Product
        getAllProducts: [Product!]
    }

    type Product {
        id: ID!
        name: String!
        description: String!
        price: Int!
        image: String
    }
`;

export default schema;