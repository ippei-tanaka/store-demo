import {authenticate, authorize} from "@/server/auth";

export default
{
    authorize: async ({input}) => {
        const {token} = input;
        const userId = await authorize(token);
        return {
            isTokenValid: !!userId
        };
    },

    authenticate: async ({input}) => {
        const {username, password} = input;
        const token = await authenticate(username, password);
        return {token: token ? token : null};
    }
};