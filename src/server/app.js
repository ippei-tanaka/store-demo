import express from "express";
import {connect} from "./mongodb";
import router from "./router";
import {log} from "../logger";
import fs from "fs";
import path from "path";
//import session from "express-session";
//import passport from "./passport";

let server = null;

const DEFAULT_CONFIG_PATH = path.resolve(__dirname, "./config.json");

const readFile = (path) => new Promise((resolve, reject) =>
    fs.readFile(path, "utf8", (err, data) => err ? reject(err) : resolve(data)));

export const start = async ({
    configFilePath = DEFAULT_CONFIG_PATH
} = {}) => {
    if (server) { await stop(); }

    const config = JSON.parse(await readFile(configFilePath));

    const app = express();
    app.use(router);
    /*
    app.use(session({
        secret: config.session_secret,
        resave: false,
        saveUninitialized: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    */

    await connect({dbName: config.database_name});
    log("Connected to Mongo DB.");

    await new Promise((resolve) => {
        server = app.listen(config.http_port, resolve)
    });
    log(`Web Server has started at port ${config.http_port}.`);
};

export const stop = async () => {
    if (server)
    {
        await server.close();
        log("Web Server has stopped.");
        server = null;
    }
};
