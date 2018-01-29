import {start} from "@/server/app";

start({httpPort: 3000}).catch((e) => {
    console.error(e);
    process.exitCode = 1;
});