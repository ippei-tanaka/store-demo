import path from "path";
import {Router} from "express";
import {log} from "../../logger/index";
import graphqlHTTP from "express-graphql";
import schema from "../graphql/schema";

const router = new Router();

router.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./index.html"));
});

router.use("/graphql", graphqlHTTP(() => ({
    schema
    //,graphiql:true
})));

export default router;