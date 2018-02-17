const server = require('../build/api-server/app');

server.start().catch((e) => {
    console.error(e);
    process.exitCode = 1;
});