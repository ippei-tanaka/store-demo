import {buildSchema} from "graphql";

const graphql = strings => buildSchema(strings[0]);

const schema = graphql`
    type Query {
        authorize(input: TokenInput): AuthorizationResult
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

    type AuthorizationResult {
        success: Boolean!
        userId: ID
    }
`;

export default schema;