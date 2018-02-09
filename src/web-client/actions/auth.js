import {fetchDataFromGraphQlPath as fetch} from '@/web-client/fetch';
import {AUTHENTICATE, VERIFY_TOKEN, LOGOUT} from '@/web-client/actions/constants';
import store from '@/web-client/stores';

export const authenticate = async ({username, password}) => {
    const response1 = await fetch({
        path: '/auth',
        query: `
        mutation{
            authenticate(input:{username:"${username}",password:"${password}"}) {
              token
            }
        }
        `,
    });
    const token = response1.data.authenticate.token;
    const response2 = await fetch({
        path: '/auth',
        query: `
            query { 
                verifyToken (input: {token: "${token}"})
                { isValid, user { name, permissions } }
            }
        `,
    });
    const {isValid, user} = response2.data.verifyToken;
    return {
        type: AUTHENTICATE,
        payload: {
            token: isValid ? token : null,
            name: user && user.name,
            permissions: user && user.permissions,
        },
    };
};

export const verifyToken = async () => {
    const state = store.getState();
    const token = state.auth.token;
    const response = await fetch({
        path: '/auth',
        query: `
            query { 
                verifyToken (input: {token: "${token}"})
                { isValid, user { name, permissions } }
            }
        `,
    });
    const {isValid, user} = response.data.verifyToken;
    return {
        type: VERIFY_TOKEN,
        payload: {
            token: isValid ? token : null,
            name: user && user.name,
            permissions: user && user.permissions,
        },
    };
};

export const logout = async () => ({
    type: LOGOUT,
    payload: null,
});