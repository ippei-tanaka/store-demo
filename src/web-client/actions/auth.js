import {fetchDataFromGraphQlPath as fetch} from '@/web-client/fetch';
import {AUTHENTICATE, VERIFY_TOKEN, LOGOUT} from '@/web-client/actions/constants';
import jwtDecode from 'jwt-decode';

let timeoutID = null;

const setTimeoutForVerifyingToken = (token, dispatch) =>
{
    if (typeof token !== 'string') {
        return;
    }

    if (timeoutID)
    {
        clearTimeout(timeoutID);
        timeoutID = null;
    }

    const {exp} = jwtDecode(token);
    const current = Date.now() / 1000;
    const diff = (exp - current) * 1000;
    timeoutID = setTimeout(() => dispatch(verifyToken()), Math.max(diff, 0));
};

export const authenticate = async ({username, password}) => async (dispatch) => {
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
    setTimeoutForVerifyingToken(token, dispatch);
    dispatch({
        type: AUTHENTICATE,
        payload: {
            token: isValid ? token : null,
            name: user && user.name,
            permissions: user && user.permissions,
        },
    });
};

export const verifyToken = async () => async (dispatch, getState) => {
    const state = getState();
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
    setTimeoutForVerifyingToken(token, dispatch);
    dispatch({
        type: VERIFY_TOKEN,
        payload: {
            token: isValid ? token : null,
            name: user && user.name,
            permissions: user && user.permissions,
        },
    });
};

export const logout = async () => ({
    type: LOGOUT,
    payload: null,
});