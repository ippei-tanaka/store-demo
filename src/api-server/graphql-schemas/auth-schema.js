import {graphql} from '@/api-server/template-string-tag';

const schema = graphql`
    type Query {
        verifyToken(input: TokenInput): AuthorizationResult
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
        isValid: Boolean!
        userId: ID
    }
`;

export default schema;