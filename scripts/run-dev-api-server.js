import {start} from "@/api-server/app";

(async () => {
    await start();
})().catch((e) => {
    console.error(e);
    process.exitCode = 1;
});