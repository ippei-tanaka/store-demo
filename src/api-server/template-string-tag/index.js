import R from 'ramda';
import {buildSchema} from 'graphql';

export const graphql = (...args) => {
    const strings = R.dropLast(1, args[0]);
    const variables = R.drop(1, args);
    const string = strings.reduce((memory, value, index) =>
        memory + value + variables[index], '') + R.last(args[0]);
    return buildSchema(string);
};
