import path from "path";
import {Router} from "express";
import graphqlHTTP from "express-graphql";
import adminSchema from "@/server/graphql-schemas/admin-schema";
import adminResolvers from "@/server/resolvers/admin-resolvers";
import authSchema from "@/server/graphql-schemas/auth-schema";
import authResolver from "@/server/resolvers/auth-resolvers";
import {authorize} from "@/server/auth";

const router = new Router();

const parseToken = (str) =>
{
    if (!str) return "";
    const match = str.match(/Bearer (\S+)/);
    if (!match) return "";
    return match[1];
};

const authMiddleware = (request, response, next) =>
{
    const token = parseToken(request.get("Authorization"));
    authorize(token).then(userId => {
        if (userId)
        {
            request.userId = userId;
            next();
            return;
        }
        response.json({errors: [{message: "Unauthorized"}]});
    });
};

router.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../index.html"));
});

router.use("/auth", graphqlHTTP(() => ({
    schema: authSchema,
    rootValue: {...authResolver},
    //graphiql: true
})));

router.use("/graphql", authMiddleware, graphqlHTTP((request) => ({
    schema: adminSchema,
    rootValue: {...adminResolvers},
    context: {request},
    //graphiql: true
})));

export default router;