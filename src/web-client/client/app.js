import {love} from "@/web-client/client/love";

console.log(123);

document.querySelector("#button").onclick = (e) => {
    e.preventDefault();
    love();
};