import express from "express";
import {connect} from "./mongodb";
import router from "./router";
import {log} from "../logger";

const app = express();

app.use(router);

export const start = async ({httpPort}) =>
{
    await connect({dbName: "store-demo"});
    log("Connected to Mongo DB.");

    await startWebServer({port: httpPort});
    log(`Web Server started at port ${httpPort}.`);
};

export const startWebServer = ({port}) => new Promise((resolve) => app.listen(port, resolve));