import { buildSchema } from "graphql";
import schemaString from "./schema.graphql";
console.log(schemaString);
export default buildSchema(schemaString);