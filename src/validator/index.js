import cond from 'lodash/cond';
import stubTrue from 'lodash/stubTrue';
import negate from 'lodash/negate';
import constant from 'lodash/constant';
import isNaN from 'lodash/isNaN';
import isNull from 'lodash/isNull';
import isUndefined from 'lodash/isUndefined';

const isString = v => (typeof v === 'string');

const isNumber = v => (typeof v === 'number');

const validAs = regex => regex.test.bind(regex);

const isLength = ({min, max}) =>
    (v) => (min <= v.length && v.length <= max);

const isEmpty = (v) => (isNull(v) || isUndefined(v) || v === '');

const errorConstructor = (message) => () => new Error(message);

export const verifyUserName = cond([
    [isEmpty, errorConstructor('The value is required.')],
    [negate(isString), errorConstructor('The value should be strings.')],
    [negate(isLength({min: 4, max: 50})), errorConstructor('The value should be within 4 to 50 characters.')],
    [negate(validAs(/^[a-zA-Z0-9_\-@!#%&*+.]+$/)), errorConstructor('The value is invalid.')],
    [stubTrue, constant(null)],
]);

export const validatePassword = cond([
    [isEmpty, errorConstructor('The value is required.')],
    [negate(isString), errorConstructor('The value should be strings.')],
    [negate(isLength({min: 8, max: 20})), errorConstructor('The value should be within 8 to 20 characters.')],
    [negate(validAs(/^[a-zA-Z0-9_\-@!#%&*+]+$/)), errorConstructor('The value is invalid.')],
    [stubTrue, constant(null)],
]);

export const verifyProductName = cond([
    [isEmpty, errorConstructor('The value is required.')],
    [negate(isString), errorConstructor('The value should be string.')],
    [negate(isLength({min: 1, max: 50})), errorConstructor('The value should be within 1 to 50 characters.')],
    [negate(validAs(/^[a-zA-Z0-9_\-@!# %&*+.]+$/)), errorConstructor('The value is invalid.')],
    [stubTrue, constant(null)],
]);

export const verifyProductDescription = cond([
    [isEmpty, errorConstructor('The value is required.')],
    [negate(isString), errorConstructor('The value should be string.')],
    [negate(isLength({min: 1, max: 300})), errorConstructor('The value should be within 1 to 50 characters.')],
    [stubTrue, constant(null)],
]);

export const verifyProductPrice = cond([
    [isEmpty, errorConstructor('The value is required.')],
    [negate(isNumber), errorConstructor('The value should be a number.')],
    [isNaN, errorConstructor('The value can\'t be a NaN.')],
    [v => v <= 0, errorConstructor('The value should be greater than 0.')],
    [stubTrue, constant(null)],
]);
