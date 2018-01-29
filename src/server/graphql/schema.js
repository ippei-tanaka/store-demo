import { buildSchema } from "graphql";
import schemaString from "./schema.graphql";
export default buildSchema(schemaString);