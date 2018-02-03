import {error} from '@/logger';

export const loadState = () => {
    try {
        const state = localStorage.getItem('state');
        return state ? JSON.parse(state) : undefined;
    } catch (e) {
        return undefined;
    }
};

export const saveState = (state) => {
    try {
        localStorage.setItem('state', JSON.stringify(state));
    } catch (e) {
        error(e);
    }
};