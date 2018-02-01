import {love} from "@/client/assets/scripts/love";
import "@/client/index.html";
import "@/client/set.html";

document.querySelector("#button").onclick = (e) => {
    e.preventDefault();
    love();
};