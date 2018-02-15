import {verifyUserName, validatePassword, verifyProductPrice} from '@/validator';
import repeat from 'lodash/repeat';

jest.setTimeout(30000);

describe('verifyUserName', () => {
    it('should return an error if the value is invalid.', async () => {
        expect(verifyUserName(null)).toBeInstanceOf(Error);
        expect(verifyUserName(10)).toBeInstanceOf(Error);
        expect(verifyUserName('')).toBeInstanceOf(Error);
        expect(verifyUserName('e')).toBeInstanceOf(Error);
        expect(verifyUserName(repeat('e', 51))).toBeInstanceOf(Error);
        expect(verifyUserName('sSDe fdg')).toBeInstanceOf(Error);
        expect(verifyUserName('dsf(dd)')).toBeInstanceOf(Error);
    });

    it('should return null if the value is valid.', async () => {
        expect(verifyUserName('testname')).toBeNull();
        expect(verifyUserName('ippei-tanaka')).toBeNull();
        expect(verifyUserName('20#%&*+ippei@tanaka.jp')).toBeNull();
        expect(verifyUserName(repeat('e', 50))).toBeNull();

    });
});

describe('validatePassword', () => {
    it('should return an error if the value is invalid.', async () => {
        expect(validatePassword(null)).toBeInstanceOf(Error);
        expect(validatePassword(10)).toBeInstanceOf(Error);
        expect(validatePassword('')).toBeInstanceOf(Error);
        expect(validatePassword('e')).toBeInstanceOf(Error);
        expect(validatePassword(repeat('e', 21))).toBeInstanceOf(Error);
        expect(validatePassword('sSDe fdg')).toBeInstanceOf(Error);
        expect(validatePassword('dsf(dd)')).toBeInstanceOf(Error);
    });

    it('should return null if the value is valid.', async () => {
        expect(verifyUserName('password')).toBeNull();
        expect(verifyUserName('ippei-tanaka')).toBeNull();
        expect(verifyUserName('20#%&*+ippei@tanakp')).toBeNull();
    });
});


describe('verifyProductPrice', () => {
    it('should return an error if the value is invalid.', async () => {
        expect(verifyProductPrice(null)).toBeInstanceOf(Error);
        expect(verifyProductPrice([])).toBeInstanceOf(Error);
        expect(verifyProductPrice('')).toBeInstanceOf(Error);
        expect(verifyProductPrice(0)).toBeInstanceOf(Error);
        expect(verifyProductPrice(-1)).toBeInstanceOf(Error);
        expect(verifyProductPrice(-0.8)).toBeInstanceOf(Error);
    });

    it('should return null if the value is valid.', async () => {
        expect(verifyProductPrice(10)).toBeNull();
        expect(verifyProductPrice(0.8)).toBeNull();
        expect(verifyProductPrice(10.8)).toBeNull();
        expect(verifyProductPrice(10000000)).toBeNull();
    });
});