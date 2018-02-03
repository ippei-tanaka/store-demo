import UniversalRouter from 'universal-router';
import routes from '@/web-client/router/routes';

export const basename = '';

export default new UniversalRouter(routes, {
    baseUrl: basename,
});