import adminProductList from '../../src/web-client/reducers/admin/adminProductList';
import {
    LOAD_ADMIN_PRODUCT_LIST,
    CREATE_PRODUCT,
    UPDATE_PRODUCT, DELETE_PRODUCT,
} from '@/web-client/actions/constants';
import {
    dropRight,
    map,
    omit
} from 'lodash/fp';

jest.setTimeout(30000);

describe('adminProductList', () => {
    it('should take a decent array of products.', async () => {
        const products = [
            {
                id: '1',
                name: 'name1',
                price: 1,
                description: 'testtesttest',
            },
            ['something'],
            true,
            {
                id: '2',
                name: 'name2',
                price: 20,
                description: 'testtesttest',
                image: 'test',
                something: true,
            },
        ];
        const newState = adminProductList(undefined, {
            type: LOAD_ADMIN_PRODUCT_LIST,
            payload: products,
        });
        expect(newState).toEqual([
            {
                id: '1',
                name: 'name1',
                price: 1,
                description: 'testtesttest',
            },
            {
                id: '2',
                name: 'name2',
                price: 20,
                description: 'testtesttest',
                image: 'test',
            },
        ]);

        const newState2 = adminProductList([], {
            type: LOAD_ADMIN_PRODUCT_LIST,
            payload: {},
        });
        expect(newState2).toEqual([]);
    });

    it('should not take an array of products with a duplicated id.',
        async () => {
            const products = [
                {
                    id: '1',
                    name: 'name1',
                    price: 1,
                    description: 'testtesttest',
                    extra: 'not needed',
                },
                {
                    id: '2',
                    name: 'name2',
                    price: 20,
                    description: 'testtesttest',
                },
                {
                    id: '1',
                    name: 'name3',
                    price: 40,
                    description: 'testtesttest',
                },
            ];
            const newState = adminProductList(undefined, {
                type: LOAD_ADMIN_PRODUCT_LIST,
                payload: products,
            });
            const decentProducts = dropRight(1)(
                map(omit(['extra']))(products));
            expect(newState).toEqual(decentProducts);
        });

    it('should add a new product.',
        async () => {
            const product =
                {
                    id: '1',
                    name: 'name1',
                    price: 1,
                    description: 'testtesttest',
                    extra: 'not needed',
                };
            const newState = adminProductList(undefined, {
                type: CREATE_PRODUCT,
                payload: product,
            });
            expect(newState).toEqual([{
                id: '1',
                name: 'name1',
                price: 1,
                description: 'testtesttest',
            }]);
        });

    it('should update a product.',
        async () => {
            const products = [
                {
                    id: '1',
                    name: 'name1',
                    price: 1,
                    description: 'testtesttest',
                },
                {
                    id: '2',
                    name: 'name2',
                    price: 20,
                    description: 'testtesttest',
                }
            ];
            const newProduct = {
                id: '1',
                name: 'newName',
                price: 100,
                description: 'updated description',
            };
            const newState = adminProductList(products, {
                type: UPDATE_PRODUCT,
                payload: newProduct,
            });
            expect(newState).toEqual([{
                id: '1',
                name: 'newName',
                price: 100,
                description: 'updated description',
            }, {
                id: '2',
                name: 'name2',
                price: 20,
                description: 'testtesttest',
            }]);
        });

    it('should delete a product.',
        async () => {
            const products = [
                {
                    id: '1',
                    name: 'name1',
                    price: 1,
                    description: 'testtesttest',
                },
                {
                    id: '2',
                    name: 'name2',
                    price: 20,
                    description: 'testtesttest',
                }
            ];
            const newState = adminProductList(products, {
                type: DELETE_PRODUCT,
                payload: {id: '1'},
            });
            expect(newState).toEqual([{
                id: '2',
                name: 'name2',
                price: 20,
                description: 'testtesttest',
            }]);
        });
});