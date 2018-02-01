import {graphql} from "graphql";
import adminSchema from "@/server/graphql-schemas/admin-schema";
import adminResolvers from "@/server/resolvers/admin-resolvers";
import {connect, disconnect, dropDatabase} from "@/server/mongo-db-driver";

const TEST_DB = "store-demo-graphql-admin-test";

beforeAll(() => connect({dbName: TEST_DB}));
beforeEach(() => dropDatabase());
afterAll(() => dropDatabase());
afterAll(() => disconnect());

const createProduct = async ({name, price}) =>
{
    const query = `
        mutation { 
            createProduct (input: {name: "${name}", price: ${price}})
            { id }
        }
    `;
    const response = await graphql(adminSchema, query, adminResolvers);
    return response.data.createProduct.id;
};

jest.setTimeout(10000);

describe("createProduct", () =>
{
    it("should create a product", async () => {
        const query = `
            mutation { 
                createProduct (input: {name: "my product", price: 12345})
                { id }
            }
        `;
        const {data} = await graphql(adminSchema, query, adminResolvers);
        expect(data.createProduct.id).toBeTruthy();
    });
});

describe("product", () =>
{
    it("should return a product", async () => {
        const id = await createProduct({name: "test item", price: 444});
        const query = `{ product (id: "${id}") { name, price } }`;
        const {data} = await graphql(adminSchema, query, adminResolvers);
        expect(data.product).toEqual({name: "test item", price: 444});
    });
});

describe("products", () =>
{
    it("should return an empty array when db is clean", async () => {
        const query = "{ products { id } }";
        const {data} = await graphql(adminSchema, query, adminResolvers);
        expect(data.products).toHaveLength(0);
    });

    it("should return a list of products", async () => {
        await createProduct({name: "my item 1", price: 123});
        await createProduct({name: "my item 2", price: 456});
        const query = "{ products { name, price } }";
        const {data} = await graphql(adminSchema, query, adminResolvers);
        expect(data.products).toHaveLength(2);
        expect(data.products[0]).toEqual({name: "my item 1", price: 123});
        expect(data.products[1]).toEqual({name: "my item 2", price: 456});
    });
});

describe("updateProduct", () =>
{
    it("should update a product", async () => {
        const id = await createProduct({name: "soap", price: 3});
        const newProduct =  {name: "shampoo", price: 6};
        const mutation = `
            mutation { 
                updateProduct (
                    id : "${id}",
                    input: {name: "${newProduct.name}",
                    price: ${newProduct.price}
                }) { id, name, price }
            }
        `;
        const {data: {updateProduct}} = await graphql(adminSchema, mutation, adminResolvers);
        expect(updateProduct.id).toBeTruthy();
        expect(updateProduct.name).toBe(newProduct.name);
        expect(updateProduct.price).toBe(newProduct.price);

        const query = `{ product (id: "${id}") { name, price } }`;
        const {data: {product}} = await graphql(adminSchema, query, adminResolvers);
        expect(product).toEqual(newProduct);
    });
});

describe("deleteProduct", () =>
{
    it("should delete a product", async () => {
        const id = await createProduct({name: "coffee", price: 10});
        const mutation = `
            mutation { 
                deleteProduct (id : "${id}") { id, name, price }
            }
        `;
        const {data: {deleteProduct}} = await graphql(adminSchema, mutation, adminResolvers);
        expect(deleteProduct.id).toBeTruthy();
        expect(deleteProduct.name).toBe("coffee");
        expect(deleteProduct.price).toBe(10);

        const query = "{ products { id } }";
        const {data} = await graphql(adminSchema, query, adminResolvers);
        expect(data.products).toHaveLength(0);
    });
});

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

describe("createUser", () =>
{
    it("should create a user", async () => {
        const query = `
            mutation { 
                createUser (input: {name: "the+user", password: "password"})
                { id }
            }
        `;
        const {data} = await graphql(adminSchema, query, adminResolvers);
        expect(data.createUser.id).toBeTruthy();
    });

    it("should fail when creating a user with a duplicated name", async () => {
        const query = `
            mutation { 
                createUser (input: {name: "the+user", password: "password"})
                { id }
            }
        `;
        await graphql(adminSchema, query, adminResolvers);
        const {errors} = await graphql(adminSchema, query, adminResolvers);
        expect(errors).toBeTruthy();
    });
});

describe("findUserById", () =>
{
    it("should return a user", async () => {
        const id = await createUser({name: "test&item", password: "thisispassword"});
        const query = `{ findUserById (id: "${id}") { name } }`;
        const {data, errors} = await graphql(adminSchema, query, adminResolvers);
        expect(data.findUserById).toEqual({name: "test&item"});
        expect(errors).toBeFalsy();
    });

    it("should not return a user with their password", async () => {
        const id = await createUser({name: "test*item", password: "thisispassword"});
        const query = `{ findUserById (id: "${id}") { name, password } }`;
        const {errors} = await graphql(adminSchema, query, adminResolvers);
        expect(errors).toBeTruthy();
    });
});

describe("findUserByName", () =>
{
    it("should return a user", async () => {
        await createUser({name: "test&item", password: "thisispassword"});
        const query = "{ findUserByName (name: \"test&item\") { name } }";
        const {data, errors} = await graphql(adminSchema, query, adminResolvers);
        expect(data.findUserByName).toEqual({name: "test&item"});
        expect(errors).toBeFalsy();
    });
});

describe("getAllUsers", () =>
{
    it("should return a list of users", async () => {
        await createUser({name: "user1", password: "password1"});
        await createUser({name: "user2", password: "password2"});
        await createUser({name: "user3", password: "password3"});
        const query = "{ getAllUsers { name } }";
        const response = await graphql(adminSchema, query, adminResolvers);
        expect(response.data.getAllUsers).toHaveLength(3);
        expect(response.data.getAllUsers[0]).toEqual({name: "user1"});
        expect(response.data.getAllUsers[1]).toEqual({name: "user2"});
        expect(response.data.getAllUsers[2]).toEqual({name: "user3"});
    });
});

describe("updateUser", () =>
{
    it("should update a user", async () => {
        const id = await createUser({name: "userA", password: "password1"});
        const newName = "userB";
        const mutation = `
            mutation { 
                updateUser (
                    id : "${id}",
                    input: {
                        name: "${newName}"
                    }
                ) { id, name }
            }
        `;
        const response = await graphql(adminSchema, mutation, adminResolvers);
        expect(response.data.updateUser.id).toBeTruthy();
        expect(response.data.updateUser.name).toBe(newName);

        const query = `{ findUserById (id: "${id}") { id, name } }`;
        const response2 = await graphql(adminSchema, query, adminResolvers);
        expect(response2.data.findUserById).toEqual({id, name: newName});
    });
});

describe("deleteUser", () =>
{
    it("should delete a user", async () => {
        const id = await createUser({name: "my_name", password: "password1"});
        const mutation = `
            mutation { 
                deleteUser (id : "${id}") { id, name }
            }
        `;
        const {data: {deleteUser}} = await graphql(adminSchema, mutation, adminResolvers);
        expect(deleteUser.id).toBeTruthy();
        expect(deleteUser.name).toBe("my_name");

        const query = "{ getAllUsers { id } }";
        const {data} = await graphql(adminSchema, query, adminResolvers);
        expect(data.getAllUsers).toHaveLength(0);
    });
});
