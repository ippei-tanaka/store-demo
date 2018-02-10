import {fetchDataFromGraphQlPath as fetch} from '@/web-client/fetch';
import {LOAD_PRODUCT_LIST} from '@/web-client/actions/constants';

export const loadProductList = async () => {
    const response = await fetch({
        path: '/product',
        query: `
            query {
                getAllProducts { id, name, description, price }
            }
        `
    });
    return {
        type: LOAD_PRODUCT_LIST,
        payload: response.data.getAllProducts,
    };
};