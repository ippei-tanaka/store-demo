export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const login = async () => ({
    type: LOGIN,
    payload: {
        name: 'lokj',
    },
});

export const logout = async () => ({
    type: LOGOUT,
    payload: null,
});