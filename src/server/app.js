import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import router from "./router";
import {log} from "../utilities";

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(router);

export const start = async ({httpPort}) => {
    await mongoose.connect("mongodb://localhost/store-demo");
    log("Connected to Mongo DB.");

    await new Promise((resolve) => app.listen(httpPort, resolve));
    log(`Web Server started at port ${httpPort}.`);
};