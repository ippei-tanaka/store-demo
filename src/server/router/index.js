import path from "path";
import {Router} from "express";
import graphqlHTTP from "express-graphql";
import schema from "../graphql/schema";
import resolvers from "../mongodb/resolvers";

const router = new Router();

router.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../index.html"));
});

router.use("/graphql", graphqlHTTP(() => ({
    schema,
    rootValue: {...resolvers},
    graphiql: true
})));

export default router;