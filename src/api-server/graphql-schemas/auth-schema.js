import {buildSchema} from 'graphql';
import {ADMIN, SHOP} from '@/api-server/permissions';

const schemaString = `
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

export default buildSchema(schemaString);