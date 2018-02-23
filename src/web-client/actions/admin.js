import {
    fetchDataFromGraphQlPath as query,
    uploadFile
} from '@/web-client/fetch';
import {
    LOAD_ADMIN_PRODUCT_LIST,
    CREATE_PRODUCT,
    UPDATE_PRODUCT,
    DELETE_PRODUCT,
    OPEN_ADMIN_NAV,
    CLOSE_ADMIN_NAV,
    LOAD_ADMIN_ORDER_LIST,
    LOAD_ADMIN_USER_LIST,
    UPLOAD_ADMIN_MEDIA,
    LOAD_ADMIN_MEDIA_LIST,
    DELETE_ADMIN_MEDIUM,
} from '@/web-client/actions/constants';

export const loadAdminProductList = async () => async (dispatch, getState) => {
    const state = getState();
    const response = await query({
        path: '/admin',
        query: `
            query {
                getAllProducts { id, name, description, price }
            }
        `,
        token: state.auth.token,
    });
    dispatch({
        type: LOAD_ADMIN_PRODUCT_LIST,
        payload: response.data.getAllProducts,
    });
};

export const createProduct = async (productData) => async (dispatch, getState) => {
    const state = getState();
    const response = await query({
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
    dispatch({
        type: CREATE_PRODUCT,
        payload: response.data.createProduct,
    });
};

export const updateProduct = async (id, productData) => async (dispatch, getState) => {
    const state = getState();
    const response = await query({
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
    dispatch({
        type: UPDATE_PRODUCT,
        payload: response.data.updateProduct,
    });
};

export const deleteProduct = async (id) => async (dispatch, getState) => {
    const state = getState();
    const response = await query({
        path: '/admin',
        query: `
            mutation {
                deleteProduct (id: "${id}") { id }
            }
        `,
        token: state.auth.token,
    });
    dispatch({
        type: DELETE_PRODUCT,
        payload: response.data.deleteProduct,
    });
};

export const loadAdminOrderList = async () => async (dispatch, getState) => {
    const state = getState();
    const response = await query({
        path: '/admin',
        query: `
            query {
                getAllOrders { id, userId, items { productId, quantity } }
            }
        `,
        token: state.auth.token,
    });
    dispatch({
        type: LOAD_ADMIN_ORDER_LIST,
        payload: response.data.getAllOrders,
    });
};

export const loadAdminUserList = async () => async (dispatch, getState) => {
    const state = getState();
    const response = await query({
        path: '/admin',
        query: `
            query {
                getAllUsers { id, name }
            }
        `,
        token: state.auth.token,
    });
    dispatch({
        type: LOAD_ADMIN_USER_LIST,
        payload: response.data.getAllUsers,
    });
};

export const deleteAdminMedium = async (id) => async (dispatch, getState) => {
    const state = getState();
    const response = await query({
        path: '/admin',
        query: `
            mutation {
                deleteMedium (id: "${id}") { id }
            }
        `,
        token: state.auth.token,
    });
    dispatch({
        type: DELETE_ADMIN_MEDIUM,
        payload: response.data.deleteMedium,
    });
    dispatch(loadAdminMediumList());
};

export const loadAdminMediumList = async () => async (dispatch, getState) => {
    const state = getState();
    const response = await query({
        path: '/admin',
        query: `
            query {
                getAllMedia { id, type }
            }
        `,
        token: state.auth.token,
    });
    dispatch({
        type: LOAD_ADMIN_MEDIA_LIST,
        payload: response.data.getAllMedia,
    });
};

export const uploadAdminMedia = async (files) => async (dispatch, getState) => {
    const state = getState();
    const response = await uploadFile({
        path: '/media',
        file: files[0],
        token: state.auth.token,
    });
    dispatch({
        type: UPLOAD_ADMIN_MEDIA,
        payload: response.data.id,
    });
    dispatch(loadAdminMediumList());
};

export const openNav = async () => {
    return {
        type: OPEN_ADMIN_NAV
    };
};

export const closeNav = async () => {
    return {
        type: CLOSE_ADMIN_NAV
    };
};