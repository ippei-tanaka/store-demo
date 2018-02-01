const server = require("../build/web-client/server");

server.start().catch((e) => {
    console.error(e);
    process.exitCode = 1;
});