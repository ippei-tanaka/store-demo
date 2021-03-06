import {graphql} from 'graphql';
import authSchema from '@/api-server/graphql-schemas/auth-schema';
import authResolvers from '@/api-server/resolvers/auth-resolvers';
import adminSchema from '@/api-server/graphql-schemas/admin-schema';
import adminResolvers from '@/api-server/resolvers/admin-resolvers';
import {connect, disconnect, dropDatabase} from '@/api-server/mongo-db-driver';

const TEST_DB = 'store-demo-graphql-auth-test';

beforeAll(async () => await connect({dbName: TEST_DB}));
beforeEach(async () => await dropDatabase());
afterAll(async () => {
    await dropDatabase();
    await disconnect();
});

jest.setTimeout(30000);

const createUser = async ({name, password, permissions = '[]'}) => {
    const query = `
        mutation { 
            createUser (input: {
                name: "${name}", password: "${password}",
                permissions: ${permissions}
            })
            { id }
        }
    `;
    const response = await graphql(adminSchema, query, adminResolvers);
    return response.data.createUser.id;
};

describe('authenticate', () => {
    it('should fail if the username is wrong', async () => {
        await createUser({
            name: 'my345',
            password: 'my-password',
        });
        const query = `
            mutation { 
                authenticate (input: {username: "okonk", password: "my-password"})
                { token }
            }
        `;
        const response = await graphql(authSchema, query, authResolvers);
        expect(response.data.authenticate.token).toBeNull();
    });

    it('should fail if the password is wrong', async () => {
        await createUser({
            name: 'my345',
            password: 'my-password',
        });
        const query = `
            mutation { 
                authenticate (input: {username: "my345", password: "password"})
                { token }
            }
        `;
        const response = await graphql(authSchema, query, authResolvers);
        expect(response.data.authenticate.token).toBeNull();
    });

    it('should return a token when the credential is correct', async () => {
        await createUser({
            name: 'my345',
            password: 'my-password',
        });
        const query = `
            mutation { 
                authenticate (input: {username: "my345", password: "my-password"})
                { token }
            }
        `;
        const response = await graphql(authSchema, query, authResolvers);
        expect(response.data.authenticate.token).toBeTruthy();
    });

    it('should fail if the password is old', async () => {
        const id = await createUser({
            name: 'my345',
            password: 'my-old-password',
        });
        const query1 = `
            mutation { 
                updateUser (id: "${id}", input: {oldPassword: "my-old-password", password: "my-new-password"})
                { id }
            }
        `;
        await graphql(adminSchema, query1, adminResolvers);
        const query2 = `
            mutation { 
                authenticate (input: {username: "my345", password: "my-old-password"})
                { token }
            }
        `;
        const response2 = await graphql(authSchema, query2, authResolvers);
        expect(response2.data.authenticate.token).toBeNull();
    });
});

const getToken = async ({name, password, tokenOptions = {}}) => {
    const query = `
            mutation { 
                authenticate (input: {username: "${name}", password: "${password}"})
                { token }
            }
        `;
    const response = await graphql(authSchema, query, authResolvers,
        {tokenOptions});
    return response.data.authenticate.token;
};

describe('verifyToken', () => {
    it('should succeed if the token is valid', async () => {
        const id = await createUser({
            name: 'my345',
            password: 'my-password',
        });
        const token = await getToken({
            name: 'my345',
            password: 'my-password',
        });
        const query = `
            query { 
                verifyToken (input: {token: "${token}"})
                { isValid, user {id} }
            }
        `;
        const response = await graphql(authSchema, query, authResolvers);
        expect(response.data.verifyToken.isValid).toBe(true);
        expect(response.data.verifyToken.user.id).toBe(id);
    });

    it('should fail if the token is invalid', async () => {
        const token = 'invalidtoken';
        const query = `
            query { 
                verifyToken (input: {token: "${token}"})
                { isValid, user {id} }
            }
        `;
        const response = await graphql(authSchema, query, authResolvers);
        expect(response.data.verifyToken.isValid).toBe(false);
        expect(response.data.verifyToken.user).toBeNull();
    });

    it('should fail if the token is expired', async () => {
        const id = await createUser({
            name: 'my345',
            password: 'my-password',
            permissions: '[SHOP]'
        });
        const token = await getToken({
            name: 'my345',
            password: 'my-password',
            tokenOptions: {expiresIn: '4s'},
        });
        const query = `
            query { 
                verifyToken (input: {token: "${token}"})
                { isValid, user {id, name, permissions} }
            }
        `;
        const response1 = await graphql(authSchema, query, authResolvers);
        expect(response1.data.verifyToken.isValid).toBe(true);
        expect(response1.data.verifyToken.user.id).toBe(id);
        expect(response1.data.verifyToken.user.name).toBe('my345');
        expect(response1.data.verifyToken.user.permissions).toHaveLength(1);
        expect(response1.data.verifyToken.user.permissions[0]).toBe('SHOP');

        await new Promise(resolve => setTimeout(resolve, 4500));
        const response2 = await graphql(authSchema, query, authResolvers);
        expect(response2.data.verifyToken.isValid).toBe(false);
        expect(response2.data.verifyToken.user).toBeNull();
    });
});
