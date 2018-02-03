import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from '@/web-client/store';
import history from '@/web-client/history';
import router from '@/web-client/router';

const render = async (location) => {
    const route = await router.resolve(location);
    ReactDOM.render(
        <Provider store={store}>
            {route.createComponent()}
        </Provider>,
        document.getElementById('App'),
    );
};

render(history.location);
history.listen(render);