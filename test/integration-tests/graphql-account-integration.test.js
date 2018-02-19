import {graphql} from 'graphql';
import adminSchema from '@/api-server/graphql-schemas/admin-schema';
import adminResolvers from '@/api-server/resolvers/admin-resolvers';
import accountSchema from '@/api-server/graphql-schemas/account-schema';
import accountResolvers from '@/api-server/resolvers/account-resolvers';
import {connect, disconnect, dropDatabase} from '@/api-server/mongo-db-driver';

const TEST_DB = 'store-demo-graphql-account-test';

beforeAll(async () => await connect({dbName: TEST_DB}));
beforeEach(async () => await dropDatabase());
afterAll(async () => {
    await dropDatabase();
    await disconnect();
});

jest.setTimeout(30000);

const createProduct = async ({name, price, description}) => {
    const query = `
        mutation { 
            createProduct (input: {name: "${name}", price: ${price}, description: "${description}"})
            { id, name }
        }
    `;
    const response = await graphql(adminSchema, query, adminResolvers);
    return response.data.createProduct;
};

const createUser = async ({name, password}) => {
    const query = `
        mutation { 
            createUser (input: {name: "${name}", password: "${password}"})
            { id }
        }
    `;
    const response = await graphql(adminSchema, query, adminResolvers);
    return response.data.createUser;
};

describe('placeOrder', () => {
    it('should return an order id.', async () => {
        const user = await createUser({
            name: 'my_name',
            password: 'password1',
        });
        const product = await createProduct({
            name: 'Glasses',
            price: 120,
            description: 'You\'ll be able to see better.',
        });
        const mutation = `
            mutation { 
                placeOrder (input : [{productId: "${product.id}", quantity: 3}]) { id }
            }
        `;
        const response = await graphql(accountSchema, mutation, accountResolvers, {user});
        expect(response.data.placeOrder.id).toBeTruthy();
    });

    it('should return errors if order items are not valid.', async () => {
        const user = await createUser({
            name: 'my_name',
            password: 'password1',
        });
        const product = await createProduct({
            name: 'Glasses',
            price: 120,
            description: 'You\'ll be able to see better.',
        });
        const query1 = `
            mutation { 
                placeOrder (input : [{productId: "${product.id}", quantity: 0}]) { id }
            }
        `;
        const response1 = await graphql(accountSchema, query1, accountResolvers, {user});
        expect(response1.data.placeOrder).toBeNull();
        expect(response1.errors).toBeTruthy();
        const query2 = `
            mutation { 
                placeOrder (input : [{productId: "", quantity: 3}]) { id }
            }
        `;
        const response2 = await graphql(accountSchema, query2, accountResolvers, {user});
        expect(response2.data.placeOrder).toBeNull();
        expect(response2.errors).toBeTruthy();
        const query3 = `
            mutation { 
                placeOrder (input : []) { id }
            }
        `;
        const response3 = await graphql(accountSchema, query3, accountResolvers, {user});
        expect(response3.data.placeOrder).toBeNull();
        expect(response3.errors).toBeTruthy();
    });

    it('should return errors if user is invalid.', async () => {
        const product = await createProduct({
            name: 'Glasses',
            price: 120,
            description: 'You\'ll be able to see better.',
        });
        const query = `
            mutation { 
                placeOrder (input : [{productId: "${product.id}", quantity: 1}]) { id }
            }
        `;
        const response = await graphql(accountSchema, query, accountResolvers);
        expect(response.data.placeOrder).toBeNull();
        expect(response.errors).toBeTruthy();
    });
});

describe('getMyself', () => {
    it('should return the viewer.', async () => {
        const user = await createUser({
            name: 'my_name',
            password: 'password1',
        });
        const query = `
            query { 
                getMyself { id, name }
            }
        `;
        const response = await graphql(accountSchema, query, accountResolvers, {user});
        expect(response.data.getMyself.id).toBeTruthy();
        expect(response.data.getMyself.name).toBe('my_name');
    });
});

describe('findOrderById', () => {
    it('should return an order.', async () => {
        const user = await createUser({
            name: 'my_name',
            password: 'password1',
        });
        const product1 = await createProduct({
            name: 'Glasses',
            price: 120,
            description: 'You\'ll be able to see better.',
        });
        const product2 = await createProduct({
            name: 'Light',
            price: 20,
            description: 'You\'ll get a brighter room.',
        });
        const query1 = `
            mutation { 
                placeOrder (input: [
                    {productId: "${product1.id}", quantity: 2},
                    {productId: "${product2.id}", quantity: 3}
                ]) { id }
            }
        `;
        const response1 = await graphql(accountSchema, query1, accountResolvers, {user});
        const orderId = response1.data.placeOrder.id;
        const query2 = `
            query { 
                findOrderById (id: "${orderId}") {
                    id,
                    items {
                        productId, 
                        quantity 
                    }
                }
            }
        `;
        const response2 = await graphql(accountSchema, query2, accountResolvers, {user});
        expect(response2.data.findOrderById.id).toBe(orderId);
        expect(response2.data.findOrderById.items[0].productId).toBe(product1.id);
        expect(response2.data.findOrderById.items[0].quantity).toBe(2);
        expect(response2.data.findOrderById.items[1].productId).toBe(product2.id);
        expect(response2.data.findOrderById.items[1].quantity).toBe(3);
    });
});

describe('getAllOrders', () => {
    it('should return a list of orders.', async () => {
        const user = await createUser({
            name: 'my_name',
            password: 'password1',
        });
        const product1 = await createProduct({
            name: 'Glasses',
            price: 120,
            description: 'You\'ll be able to see better.',
        });
        const product2 = await createProduct({
            name: 'Light',
            price: 20,
            description: 'You\'ll get a brighter room.',
        });
        const query1 = `
            mutation { 
                placeOrder (input: [
                    {productId: "${product1.id}", quantity: 1}
                ]) { id }
            }
        `;
        const response1 = await graphql(accountSchema, query1, accountResolvers, {user});
        const orderId1 = response1.data.placeOrder.id;
        const query2 = `
            mutation { 
                placeOrder (input: [
                    {productId: "${product1.id}", quantity: 5},
                    {productId: "${product2.id}", quantity: 10}
                ]) { id }
            }
        `;
        const response2 = await graphql(accountSchema, query2, accountResolvers, {user});
        const orderId2 = response2.data.placeOrder.id;

        const user2 = await createUser({
            name: 'my_name2',
            password: 'password2',
        });
        const query3 = `
            mutation { 
                placeOrder (input: [
                    {productId: "${product1.id}", quantity: 20}
                ]) { id }
            }
        `;
        const response3 = await graphql(accountSchema, query3, accountResolvers, {user: user2});
        const orderId3 = response3.data.placeOrder.id;

        const query4 = `
            query { 
                getAllOrders {id}
            }
        `;
        const response4 = await graphql(accountSchema, query4, accountResolvers, {user});
        expect(response4.data.getAllOrders[0].id).toBe(orderId1);
        expect(response4.data.getAllOrders[1].id).toBe(orderId2);
        expect(response4.data.getAllOrders).toHaveLength(2);

        const query5 = `
            query { 
                getAllOrders {id}
            }
        `;
        const response5 = await graphql(accountSchema, query5, accountResolvers, {user: user2});
        expect(response5.data.getAllOrders[0].id).toBe(orderId3);
        expect(response5.data.getAllOrders).toHaveLength(1);
    });
});
