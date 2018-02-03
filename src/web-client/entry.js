import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import store from "./store";
import App from "./components/App";

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById("App")
);

/*
import React from "react";
import ReactDOM from "react-dom";
import App from "@/web-client/components/app";
import UniversalRouter from "universal-router";
import createBrowserHistory from "history/createBrowserHistory";

const history = createBrowserHistory();

const routes = [
    {path: "/one", action: () => <h1>Page One</h1>},
    {path: "/two", action: () => <h1>Page Two</h1>},
    {path: "(.*)", action: () => <h1>Not Found</h1>}
];

const router = new UniversalRouter(routes);

history.listen((location, action) => {
    console.log(`The current URL is ${location.pathname}${location.search}${location.hash}`);
    console.log(`The last navigation action was ${action}`);
    router.resolve(location).then(component => {
        ReactDOM.render(component, document.querySelector("#App"));
    });
});

router.resolve(history.location).then(component => {
    ReactDOM.render(component, document.querySelector("#App"));
});
*/

