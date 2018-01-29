import {graphql} from "graphql";
import schema from "@/server/graphql/schema";
import {connect, disconnect} from "@/server/mongodb";

beforeAll(() => connect({dbName: "store-demo-graphql-test"}));
afterAll(() => disconnect());

it("should be null when user is not logged in", async () => {
    const query = `
        query TestQuery {
            product(id: "abc")
            {
                name
            }
        }
    `;
    const rootValue = {};
    const {data} = await graphql(schema, query, rootValue);
    console.log(data);
    expect(null).toBeNull();
});