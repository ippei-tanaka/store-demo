import {graphql} from 'graphql';
import adminSchema from '@/api-server/graphql-schemas/admin-schema';
import adminResolvers from '@/api-server/resolvers/admin-resolvers';
import productSchema from '@/api-server/graphql-schemas/product-schema';
import productResolvers from '@/api-server/resolvers/product-resolvers';
import {connect, disconnect, dropDatabase} from '@/api-server/mongo-db-driver';

const TEST_DB = 'store-demo-graphql-product-test';

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

describe('findProductById', () => {
    it('should return a corresponding product.', async () => {
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
            query { 
                findProductById (id: "${product1.id}") { id, name }
            }
        `;
        const response1 = await graphql(productSchema, query1, productResolvers);
        expect(response1.data.findProductById.id).toBe(product1.id);
        expect(response1.data.findProductById.name).toBe(product1.name);
        const query2 = `
            query { 
                findProductById (id: "${product2.id}") { id, name }
            }
        `;
        const response2 = await graphql(productSchema, query2, productResolvers);
        expect(response2.data.findProductById.id).toBe(product2.id);
        expect(response2.data.findProductById.name).toBe(product2.name);
    });
});

describe('getAllProducts', () => {
    it('should return a list of products.', async () => {
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
        const query = `
            query { 
                getAllProducts { id, name }
            }
        `;
        const response = await graphql(productSchema, query, productResolvers);
        expect(response.data.getAllProducts[0].id).toBe(product1.id);
        expect(response.data.getAllProducts[0].name).toBe(product1.name);
        expect(response.data.getAllProducts[1].id).toBe(product2.id);
        expect(response.data.getAllProducts[1].name).toBe(product2.name);
    });
});