import {fetchDataFromGraphQlPath as fetch} from '@/web-client/fetch';
import store from '@/web-client/stores';

export const LOAD_ADMIN_PRODUCT_LIST = 'LOAD_ADMIN_PRODUCT_LIST';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';

export const loadAdminProductList = async () => {
    const state = store.getState();
    const response = await fetch({
        path: '/admin',
        query: `
            query {
                getAllProducts { id, name, description, price }
            }
        `,
        token: state.auth.token,
    });
    return {
        type: LOAD_ADMIN_PRODUCT_LIST,
        payload: response.data.getAllProducts,
    };
};

export const createProduct = async (productData) => {
    const state = store.getState();
    const response = await fetch({
        path: '/admin',
        query: `
            mutation {
                createProduct (input: {
                    name: "${productData.name}",
                    description: "${productData.description}",
                    price: ${productData.price}
                }) { id, name, description, price }
            }
        `,
        token: state.auth.token,
    });
    return {
        type: CREATE_PRODUCT,
        payload: response.data.createProduct,
    };
};

export const updateProduct = async (id, productData) => {
    const state = store.getState();
    const response = await fetch({
        path: '/admin',
        query: `
            mutation {
                updateProduct (id: "${id}", input: {
                    name: "${productData.name}",
                    description: "${productData.description}",
                    price: ${productData.price}
                }) { id, name, description, price }
            }
        `,
        token: state.auth.token,
    });
    return {
        type: UPDATE_PRODUCT,
        payload: response.data.updateProduct,
    };
};

export const deleteProduct = async (id) => {
    const state = store.getState();
    const response = await fetch({
        path: '/admin',
        query: `
            mutation {
                deleteProduct (id: "${id}") { id }
            }
        `,
        token: state.auth.token,
    });
    return {
        type: DELETE_PRODUCT,
        payload: response.data.deleteProduct,
    };
};
