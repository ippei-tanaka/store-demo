import path from "path";
import {Router} from "express";
import graphqlHTTP from "express-graphql";
import adminSchema from "@/server/graphql-schemas/admin-schema";
import adminResolvers from "@/server/resolvers/admin-resolvers";
import authSchema from "@/server/graphql-schemas/auth-schema";
import authResolvers from "@/server/resolvers/auth-resolvers";
import {pickBackReferences} from "@/server/regex-parser";
import {verifyToken, findUserById} from "@/server/graphql-queries";
import {ADMIN, SHOP} from "@/server/permissions";
import R from "ramda";

const router = new Router();

const identifyUser = async (request, response, next) =>
{
    const token = pickBackReferences(request.get("Authorization"), /Bearer (\S+)/)[0] || "";
    const {isValid, userId} = await verifyToken(token);
    if (isValid && userId)
    {
        request.user = await findUserById(userId);
    }
    next();
};

const authorize = (permission) =>
{
    return (request, response, next) =>
    {
        const user = request.user;
        if (user && user.id && R.contains(permission, user.permissions))
        {
            next();
        } else {
            response.json({errors: [new Error("Unauthorized")]});
        }
    };
};

router.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../index.html"));
});

router.use("/auth", graphqlHTTP(() => ({
    schema: authSchema,
    rootValue: authResolvers,
    graphiql: true
})));

router.use("/admin", identifyUser, authorize(ADMIN), graphqlHTTP((request) => ({
    schema: adminSchema,
    rootValue: adminResolvers,
    context: {user: request.user},
    graphiql: true
})));

export default router;