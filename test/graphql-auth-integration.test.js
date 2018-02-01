import {graphql} from "graphql";
import authSchema from "@/api-server/graphql-schemas/auth-schema";
import authResolvers from "@/api-server/resolvers/auth-resolvers";
import adminSchema from "@/api-server/graphql-schemas/admin-schema";
import adminResolvers from "@/api-server/resolvers/admin-resolvers";
import {connect, disconnect, dropDatabase} from "@/api-server/mongo-db-driver";

const TEST_DB = "store-demo-graphql-auth-test";

beforeAll(() => connect({dbName: TEST_DB}));
beforeEach(() => dropDatabase());
afterAll(() => dropDatabase());
afterAll(() => disconnect());

jest.setTimeout(10000);

const createUser = async ({name, password}) =>
{
    const query = `
        mutation { 
            createUser (input: {name: "${name}", password: "${password}"})
            { id }
        }
    `;
    const response = await graphql(adminSchema, query, adminResolvers);
    return response.data.createUser.id;
};

describe("authenticate", () =>
{
    it("should fail if the username is wrong", async () => {
        await createUser({name: "my345", password: "my-password"});
        const query = `
            mutation { 
                authenticate (input: {username: "okonk", password: "my-password"})
                { token }
            }
        `;
        const response = await graphql(authSchema, query, authResolvers);
        expect(response.data.authenticate.token).toBeNull();
    });

    it("should fail if the password is wrong", async () => {
        await createUser({name: "my345", password: "my-password"});
        const query = `
            mutation { 
                authenticate (input: {username: "my345", password: "password"})
                { token }
            }
        `;
        const response = await graphql(authSchema, query, authResolvers);
        expect(response.data.authenticate.token).toBeNull();
    });

    it("should return a token when the credential is correct", async () => {
        await createUser({name: "my345", password: "my-password"});
        const query = `
            mutation { 
                authenticate (input: {username: "my345", password: "my-password"})
                { token }
            }
        `;
        const response = await graphql(authSchema, query, authResolvers);
        expect(response.data.authenticate.token).toBeTruthy();
    });
});

const getToken = async ({name, password, tokenOptions = {}}) =>
{
    const query = `
            mutation { 
                authenticate (input: {username: "${name}", password: "${password}"})
                { token }
            }
        `;
    const response = await graphql(authSchema, query, authResolvers, {tokenOptions});
    return response.data.authenticate.token;
};

describe("verifyToken", () =>
{
    it("should succeed if the token is valid", async () => {
        const id = await createUser({name: "my345", password: "my-password"});
        const token = await getToken({name:"my345", password: "my-password"});
        const query = `
            query { 
                verifyToken (input: {token: "${token}"})
                { isValid, userId }
            }
        `;
        const response = await graphql(authSchema, query, authResolvers);
        expect(response.data.verifyToken.isValid).toBe(true);
        expect(response.data.verifyToken.userId).toBe(id);
    });

    it("should fail if the token is invalid", async () => {
        const token = "invalidtoken";
        const query = `
            query { 
                verifyToken (input: {token: "${token}"})
                { isValid, userId }
            }
        `;
        const response = await graphql(authSchema, query, authResolvers);
        expect(response.data.verifyToken.isValid).toBe(false);
        expect(response.data.verifyToken.userId).toBeNull();
    });

    it("should fail if the token is expired", async () => {
        const id = await createUser({name: "my345", password: "my-password"});
        const token = await getToken({name:"my345", password: "my-password", tokenOptions: {expiresIn: "4s"}});
        const query = `
            query { 
                verifyToken (input: {token: "${token}"})
                { isValid, userId }
            }
        `;
        const response1 = await graphql(authSchema, query, authResolvers);
        expect(response1.data.verifyToken.isValid).toBe(true);
        expect(response1.data.verifyToken.userId).toBe(id);

        await new Promise(resolve => setTimeout(resolve, 4500));
        const response2 = await graphql(authSchema, query, authResolvers);
        expect(response2.data.verifyToken.isValid).toBe(false);
        expect(response2.data.verifyToken.userId).toBeNull();
    });
});
