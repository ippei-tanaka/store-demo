import {graphql} from "graphql";
import adminSchema from "@/server/graphql-schemas/admin-schema";
import adminResolvers from "@/server/resolvers/admin-resolvers";
import authSchema from "@/server/graphql-schemas/auth-schema";
import authResolvers from "@/server/resolvers/auth-resolvers";
import {ADMIN} from "@/server/permissions";

export const createAdmin = async ({name, password}) => {
    const query = `mutation { createUser (input: {name: "${name}", password: "${password}", permissions:[${ADMIN}]}) { id } }`;
    await graphql(adminSchema, query, adminResolvers);
};

export const findUserByName = async (username) => {
    const query = `query { findUserByName (name: "${username}") { id, name, permissions } }`;
    const {data} = await graphql(adminSchema, query, adminResolvers);
    return data.findUserByName;
};

export const findUserById = async (id) => {
    const query = `query { findUserById (id: "${id}") { id, name, permissions } }`;
    const {data} = await graphql(adminSchema, query, adminResolvers);
    return data.findUserById;
};

export const verifyToken = async (token) =>
{
    const query = `query { verifyToken (input: {token: "${token}"}) { isValid, userId } }`;
    const {data} = await graphql(authSchema, query, authResolvers);
    return data.verifyToken;
};