import express from 'express';
import {log} from '@/logger';
import fs from 'fs';
import path from 'path';

let server = null;

const readFile = (path) => new Promise(
    (resolve, reject) => fs.readFile(
        path,
        'utf8',
        (err, data) => err ? reject(err) : resolve(data),
    ),
);

const DEFAULT_CONFIG_PATH = path.resolve(__dirname, './config.json');

export const start = async (
    {
        configFilePath = DEFAULT_CONFIG_PATH,
    } = {}) => {
    if (server) { await stop(); }

    const config = JSON.parse(await readFile(configFilePath));

    const app = express();

    const staticDir = path.resolve(path.dirname(configFilePath), config.static_directory);

    app.use('/', express.static(staticDir));

    app.use('*', (request, response) => {
        response.sendFile(path.resolve(staticDir, 'index.html'));
    });

    await new Promise((resolve) => {
        server = app.listen(config.http_port, resolve);
    });
    log(`Web Server has started at port ${config.http_port}.`);
};

export const stop = async () => {
    if (server) {
        await server.close();
        log('Web Server has stopped.');
        server = null;
    }
};
