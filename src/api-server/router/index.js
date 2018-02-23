import {Router} from 'express';
import bodyParser from 'body-parser';
import graphqlHTTP from 'express-graphql';
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
import MediumModel from '@/api-server/mongo-models/medium';

const router = new Router();

const constructErrorResponse = (error) => ({
    errors: [
        {
            message: error.message,
            locations: error.locations,
            //stack: error.stack,
            //path: error.path
        },
    ],
});

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
        if (user && user.id && user.permissions.indexOf(permission) !== -1) {
            next();
        } else {
            const error = new Error('Unauthorized.');
            response.json(constructErrorResponse(error));
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

const options = {
    type:['image/jpeg', 'image/png', 'image/gif'],
    limit: 1024 * 1000
};
router.post('/media', identifyUser, authorize(ADMIN), bodyParser.raw(options), async (request, response) => {
    const type = request.headers['content-type'];
    const binary = request.body;
    try {
        const medium = await (new MediumModel({type, binary})).save();
        response.json({data: {id: medium.id}});
    } catch (error) {
        response.json(constructErrorResponse(error));
    }
});

router.get('/media/:id', async (request, response) => {
    const id = request.params.id;
    try {
        const medium = await MediumModel.findById(id);
        const {type, binary} = medium;
        response.contentType(type);
        response.end(binary);
    } catch (error) {
        response.json(constructErrorResponse(error));
    }
});

export default router;