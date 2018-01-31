import {buildSchema} from "graphql";

const graphql = strings => buildSchema(strings[0]);

const schema = graphql`
    type Query {
        authorize(input: TokenInput): TokenValidation
    }

    type Mutation {
        authenticate(input: Credential!): Token
    }

    input Credential {
        username: String!
        password: String!
    }
    
    type Token {
        token: String
    }

    input TokenInput {
        token: String!
    }

    type TokenValidation {
        isTokenValid: Boolean!
    }
`;

export default schema;