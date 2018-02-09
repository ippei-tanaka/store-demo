//import path from 'path';
import {Router} from 'express';
import graphqlHTTP from 'express-graphql';
//import {GraphQLError} from 'graphql';
import adminSchema from '@/api-server/graphql-schemas/admin-schema';
import adminResolvers from '@/api-server/resolvers/admin-resolvers';
import authSchema from '@/api-server/graphql-schemas/auth-schema';
import authResolvers from '@/api-server/resolvers/auth-resolvers';
import productSchema from '@/api-server/graphql-schemas/product-schema';
import productResolvers from '@/api-server/resolvers/product-resolvers';
import accountSchema from '@/api-server/graphql-schemas/account-schema';
import accountResolvers from '@/api-server/resolvers/account-resolvers';
import {pickBackReferences} from '@/api-server/regex-parser';
import {verifyToken, findUserById} from '@/api-server/graphql-queries';
import {ADMIN, SHOP} from '@/api-server/permissions';
import R from 'ramda';

const router = new Router();

const identifyUser = async (request, response, next) => {
    const token = pickBackReferences(request.get('Authorization'),
        /Bearer (\S+)/)[0] || '';
    const {isValid, user} = await verifyToken(token);
    if (isValid && user) {
        request.user = await findUserById(user.id);
    }
    next();
};

const authorize = (permission) => {
    return (request, response, next) => {
        const user = request.user;
        if (user && user.id && R.contains(permission, user.permissions)) {
            next();
        } else {
            const error = new Error('Unauthorized.');
            response.json({
                errors: [
                    {
                        message: error.message,
                        locations: error.locations,
                        stack: error.stack,
                        path: error.path
                    },
                ],
            });
        }
    };
};

router.use('/product', graphqlHTTP(() => ({
    schema: productSchema,
    rootValue: productResolvers,
    // graphiql: true,
})));

router.use('/auth', graphqlHTTP(() => ({
    schema: authSchema,
    rootValue: authResolvers,
    // graphiql: true,
})));

router.use('/account', identifyUser, authorize(SHOP), graphqlHTTP((request) => ({
    schema: accountSchema,
    rootValue: accountResolvers,
    context: {user: request.user},
    // graphiql: true,
})));

router.use('/admin', identifyUser, authorize(ADMIN), graphqlHTTP((request) => ({
    schema: adminSchema,
    rootValue: adminResolvers,
    context: {user: request.user},
    // graphiql: true,
})));

export default router;