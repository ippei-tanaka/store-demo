import path from "path";
import {Router} from "express";
import ToDo from "./models/todo";
import {log} from "../utilities";
import graphqlHTTP from "express-graphql";
import schema from "./graphql/Schema";

const router = new Router();

router.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./index.html"));
});

router.post("/quotes", async (req, res) => {
    const todoItem = new ToDo({
        itemId: 1,
        item: req.body.item,
        completed: false
    });

    await todoItem.save().catch((reason) => {
        log("TodoItem save failed " + reason);
    });

    log("TodoItem saved successfully " + todoItem.item);
    res.redirect("/");
});

router.use("/graphql", graphqlHTTP(() => ({
    schema
    //,graphiql:true
})));

export default router;