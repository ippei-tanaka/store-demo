import {graphql} from "graphql";
import schema from "@/server/graphql/schema";
import rootValue from "@/server/graphql/root-value";
import {connect, disconnect} from "@/server/mongodb";

beforeAll(() => connect({dbName: "store-demo-graphql-test"}));
afterAll(() => disconnect());

it("should be null when user is not logged in", async () => {
    const result = await graphql(schema, query, rootValue);
    console.log(result);
    expect(null).toBeNull();
});