'use strict';
var expect = require('chai').expect;
let flag = require('../lib/ts_flag').TSFlag;
let args = ['name=IronMan', 'Type=Mark1', 'power=99'];
let tsFlag = new flag(args);

describe('Test', () => {
    it('should return IronMan', () => {
        let result = tsFlag.str('name', '', 'name of Heroes');
        expect(result).to.equal('IronMan');
    })
    it('should return string', () => {
        let result = tsFlag.str('name', '', 'name of Heroes');
        expect(result).to.be.a('string');
    })
    it('should return Mark1', () => {
        let result = tsFlag.str('Type', '', 'type of suites');
        expect(result).to.equal('Mark1');
    })
    it('should return 99', () => {
        let result = tsFlag.int('power', '', 'power of suites');
        expect(result).to.equal(99);
    })
    it('should return number', () => {
        let result = tsFlag.int('power', '', 'power of suites');
        expect(result).to.be.a('number');
    })

})