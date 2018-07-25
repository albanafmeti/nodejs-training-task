let expect = require('chai').expect;
let Helpers = require('../src/helpers');

describe('Helpers', () => {

    /**
     * Test validate function.
     */
    describe('validate(type, value)', () => {

        it('it should return false for NULL value', () => {
            expect(Helpers.validate('required', null)).to.be.false;
        });

        it('it should return false for undefined value', () => {
            expect(Helpers.validate('required', undefined)).to.be.false;
        });

        it('it should return false for empty string value', () => {
            expect(Helpers.validate('required', "")).to.be.false;
        });

        it('it should return true for other values', () => {
            expect(Helpers.validate('required', 25)).to.be.true;
            expect(Helpers.validate('required', "Hello World")).to.be.true;
            expect(Helpers.validate('required', Date.now)).to.be.true;
        });
    });

    /**
     * Test randomString function.
     */
    describe('randomString(n = 10)', () => {

        it('it should return a string with n characters', () => {
            expect(Helpers.randomString(15)).to.be.a('string').with.lengthOf(15);
        });

        it('it should return a string with 10 characters, if no argument passed', () => {
            expect(Helpers.randomString()).to.be.a('string').with.lengthOf(10);
        });

        it('it should return false if n < 1', () => {
            expect(Helpers.randomString(0)).to.be.false;
            expect(Helpers.randomString(-2)).to.be.false;
        });
    });
});