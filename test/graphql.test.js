import {graphql} from "graphql";
import schema from "@/server/graphql/schema";
import resolvers from "@/server/mongodb/resolvers";
import {connect, disconnect, dropDatabase} from "@/server/mongodb";

const TEST_DB = "store-demo-graphql-test";

beforeAll(() => connect({dbName: TEST_DB}));
beforeEach(() => dropDatabase());
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
        expect(data.products).toEqual([]);
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
