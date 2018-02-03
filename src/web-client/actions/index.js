export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const login = () => ({
    type: LOGIN,
    payload: {
        name: "lokj"
    }
});

export const logout = () => ({
    type: LOGOUT,
    payload: null
});