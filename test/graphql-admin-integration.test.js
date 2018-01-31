import {graphql} from "graphql";
import schema from "@/server/graphql-schemas/admin-schema";
import resolvers from "@/server/resolvers/admin-resolvers";
import {connect, disconnect, dropDatabase} from "@/server/mongo-db-driver";

const TEST_DB = "store-demo-graphql-test";

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
    const {data} = await graphql(schema, query, {...resolvers});
    return data.createProduct.id;
};

describe("createProduct", () =>
{
    it("should create a product", async () => {
        const query = `
            mutation { 
                createProduct (input: {name: "my product", price: 12345})
                { id }
            }
        `;
        const {data} = await graphql(schema, query, {...resolvers});
        expect(data.createProduct.id).toBeTruthy();
    });
});

describe("product", () =>
{
    it("should return a product", async () => {
        const id = await createProduct({name: "test item", price: 444});
        const query = `{ product (id: "${id}") { name, price } }`;
        const {data} = await graphql(schema, query, {...resolvers});
        expect(data.product).toEqual({name: "test item", price: 444});
    });
});

describe("products", () =>
{
    it("should return an empty array when db is clean", async () => {
        const query = "{ products { id } }";
        const {data} = await graphql(schema, query, {...resolvers});
        expect(data.products).toHaveLength(0);
    });

    it("should return a list of products", async () => {
        await createProduct({name: "my item 1", price: 123});
        await createProduct({name: "my item 2", price: 456});
        const query = "{ products { name, price } }";
        const {data} = await graphql(schema, query, {...resolvers});
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
        const {data: {updateProduct}} = await graphql(schema, mutation, {...resolvers});
        expect(updateProduct.id).toBeTruthy();
        expect(updateProduct.name).toBe(newProduct.name);
        expect(updateProduct.price).toBe(newProduct.price);

        const query = `{ product (id: "${id}") { name, price } }`;
        const {data: {product}} = await graphql(schema, query, {...resolvers});
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
        const {data: {deleteProduct}} = await graphql(schema, mutation, {...resolvers});
        expect(deleteProduct.id).toBeTruthy();
        expect(deleteProduct.name).toBe("coffee");
        expect(deleteProduct.price).toBe(10);

        const query = "{ products { id } }";
        const {data} = await graphql(schema, query, {...resolvers});
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
    const {data} = await graphql(schema, query, {...resolvers});
    return data.createUser.id;
};

describe("createUser", () =>
{
    it("should create a user", async () => {
        const query = `
            mutation { 
                createUser (input: {name: "the user", password: "password"})
                { id }
            }
        `;
        const {data} = await graphql(schema, query, {...resolvers});
        expect(data.createUser.id).toBeTruthy();
    });
});

describe("user", () =>
{
    it("should return a user", async () => {
        const id = await createUser({name: "test item", password: "thisispassword"});
        const query = `{ user (id: "${id}") { name } }`;
        const {data, errors} = await graphql(schema, query, {...resolvers});
        expect(data.user).toEqual({name: "test item"});
        expect(errors).toBeFalsy();
    });

    it("should not return a user with their password", async () => {
        const id = await createUser({name: "test item", password: "thisispassword"});
        const query = `{ user (id: "${id}") { name, password } }`;
        const {errors} = await graphql(schema, query, {...resolvers});
        expect(errors).toBeTruthy();
    });
});

describe("users", () =>
{
    it("should return a list of users", async () => {
        await createUser({name: "user1", password: "pass1"});
        await createUser({name: "user2", password: "pass2"});
        await createUser({name: "user3", password: "pass3"});
        const query = "{ users { name } }";
        const {data} = await graphql(schema, query, {...resolvers});
        expect(data.users).toHaveLength(3);
        expect(data.users[0]).toEqual({name: "user1"});
        expect(data.users[1]).toEqual({name: "user2"});
        expect(data.users[2]).toEqual({name: "user3"});
    });
});

describe("updateUser", () =>
{
    it("should update a user", async () => {
        const id = await createUser({name: "userA", password: "pass1"});
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
        const {data: {updateUser}} = await graphql(schema, mutation, {...resolvers});
        expect(updateUser.id).toBeTruthy();
        expect(updateUser.name).toBe(newName);

        const query = `{ user (id: "${id}") { id, name } }`;
        const {data: {user}} = await graphql(schema, query, {...resolvers});
        expect(user).toEqual({id, name: newName});
    });
});

describe("deleteUser", () =>
{
    it("should delete a user", async () => {
        const id = await createUser({name: "my name", password: "test"});
        const mutation = `
            mutation { 
                deleteUser (id : "${id}") { id, name }
            }
        `;
        const {data: {deleteUser}} = await graphql(schema, mutation, {...resolvers});
        expect(deleteUser.id).toBeTruthy();
        expect(deleteUser.name).toBe("my name");

        const query = "{ users { id } }";
        const {data} = await graphql(schema, query, {...resolvers});
        expect(data.users).toHaveLength(0);
    });
});
