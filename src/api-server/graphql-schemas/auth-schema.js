import {graphql} from '@/api-server/template-string-tag';
import {ADMIN, SHOP} from '@/api-server/permissions';

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
        user: User
    }

    type User {
        id: ID!
        name: String!
        permissions: [Permission]!
    }

    enum Permission {
        ${SHOP},
        ${ADMIN}
    }
`;

export default schema;