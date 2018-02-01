const server = require("../build/server/app");

server.start().catch((e) => {
    console.error(e);
    process.exitCode = 1;
});