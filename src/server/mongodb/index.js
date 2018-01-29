import mongoose from "mongoose";

export const connect = ({dbName, host = "localhost"}) => mongoose.connect(`mongodb://${host}/${dbName}`);

export const disconnect = () => mongoose.disconnect();
