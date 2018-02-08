import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from '@/web-client/stores';
import history from '@/web-client/history';
import router from '@/web-client/router';
import '@/web-client/styles/base.css';

const render = async (location) => {
    const element = await router.resolve(location);
    ReactDOM.render(
        <Provider store={store}>
            {element}
        </Provider>,
        document.getElementById('App'),
    );
};

render(history.location);
history.listen(render);