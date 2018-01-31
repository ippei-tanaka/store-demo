import path from "path";
import {Router} from "express";
import {graphql} from "graphql";
import graphqlHTTP from "express-graphql";
import adminSchema from "@/server/graphql-schemas/admin-schema";
import adminResolvers from "@/server/resolvers/admin-resolvers";
import authSchema from "@/server/graphql-schemas/auth-schema";
import authResolvers from "@/server/resolvers/auth-resolvers";
import {pickBackReferences} from "@/server/regex-parser";

const router = new Router();

const authMiddleware = (request, response, next) =>
{
    const token = pickBackReferences(request.get("Authorization"), /Bearer (\S+)/)[0] || "";
    const query = `query { authorize (input: {token: "${token}"}) { success, userId } }`;

    graphql(authSchema, query, authResolvers).then((data) => {
        if (data.authorize.success)
        {
            request.userId = data.authorize.userId;
            return next();
        }
        response.json({errors: [new Error("Unauthorized")]});
    });
};

router.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../index.html"));
});

router.use("/auth", graphqlHTTP(() => ({
    schema: authSchema,
    rootValue: authResolvers,
    graphiql: true
})));

router.use("/admin", graphqlHTTP((request) => ({
    schema: adminSchema,
    rootValue: adminResolvers,
    context: {userId: request.userId},
    graphiql: true
})));

export default router;