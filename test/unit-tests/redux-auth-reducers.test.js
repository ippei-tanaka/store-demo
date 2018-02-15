import token from '@/web-client/reducers/auth/token';
import user from '@/web-client/reducers/auth/user';

import {
    AUTHENTICATE,
    VERIFY_TOKEN,
    LOGOUT
} from '@/web-client/actions/constants';

jest.setTimeout(30000);

describe('token', () => {
    it('should extract payload properly after authentication', async () => {
        const newState1 = token(undefined, {
            type: AUTHENTICATE,
            payload: {token: 'test', extra: 'token'}
        });
        expect(newState1).toBe('test');

        const newState2 = token(undefined, {
            type: AUTHENTICATE,
            payload: {falseToken: 'test', extra: 'token'}
        });
        expect(newState2).toBe(null);

        const newState3 = token(undefined, {
            type: AUTHENTICATE,
            payload: 'token'
        });
        expect(newState3).toBe(null);
    });

    it('should extract payload properly after verifying a token', async () => {
        const newState1 = token(undefined, {
            type: VERIFY_TOKEN,
            payload: {token: 'test', extra: 'token'}
        });
        expect(newState1).toBe('test');

        const newState2 = token(undefined, {
            type: VERIFY_TOKEN,
            payload: {falseToken: 'test', extra: 'token'}
        });
        expect(newState2).toBe(null);

        const newState3 = token(undefined, {
            type: VERIFY_TOKEN,
            payload: 'token'
        });
        expect(newState3).toBe(null);
    });

    it('should extract payload properly after logout.', async () => {
        const newState = token(undefined, {
            type: LOGOUT,
            payload: {token: 'test', extra: 'token'}
        });
        expect(newState).toBe(null);
    });
});

describe('user', () => {
    it('should extract payload properly after authentication', async () => {
        const newState1 = user(undefined, {
            type: AUTHENTICATE,
            payload: {name: 'username', permissions: ['TEST'], extra: true}
        });
        expect(newState1).toEqual({name: 'username', permissions: ['TEST']});

        const newState2 = user(undefined, {
            type: AUTHENTICATE,
            payload: {permissions: ['STH'], extra: true}
        });
        expect(newState2).toEqual({name: null, permissions: ['STH']});

        const newState3 = user(undefined, {
            type: AUTHENTICATE,
            payload: {extra: true}
        });
        expect(newState3).toEqual({name: null, permissions: []});

        const newState4 = user(undefined, {
            type: AUTHENTICATE,
            payload: 'user'
        });
        expect(newState4).toEqual({name: null, permissions: []});
    });

    it('should extract payload properly after verifying a token', async () => {
        const newState1 = user(undefined, {
            type: VERIFY_TOKEN,
            payload: {name: 'username', permissions: ['TEST'], extra: true}
        });
        expect(newState1).toEqual({name: 'username', permissions: ['TEST']});

        const newState2 = user(undefined, {
            type: VERIFY_TOKEN,
            payload: {permissions: ['STH'], extra: true}
        });
        expect(newState2).toEqual({name: null, permissions: ['STH']});

        const newState3 = user(undefined, {
            type: VERIFY_TOKEN,
            payload: {extra: true}
        });
        expect(newState3).toEqual({name: null, permissions: []});

        const newState4 = user(undefined, {
            type: VERIFY_TOKEN,
            payload: 'user'
        });
        expect(newState4).toEqual({name: null, permissions: []});
    });

    it('should extract payload properly after logout', async () => {
        const newState = user(undefined, {
            type: LOGOUT,
            payload: {name: 'username', permissions: ['TEST']}
        });
        expect(newState).toEqual({name: null, permissions: []});
    });
});