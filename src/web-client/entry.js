import React from 'react';
import ReactDOM from 'react-dom';
import history from '@/web-client/history';
import router from '@/web-client/router';
import store from '@/web-client/stores';
import {Provider} from 'react-redux';

const renderElement = async (element) => {
    ReactDOM.render(
        <Provider store={store}>{element}</Provider>,
        document.getElementById('App'),
    );
};

const getElementBaseOnLocation = async (location) =>
{
    return await router.resolve(location);
};

const renderBasedOnCurrentLocation = async () =>
{
    renderElement(await getElementBaseOnLocation(history.location));
};

renderBasedOnCurrentLocation().then(() => {});
history.listen(renderBasedOnCurrentLocation);