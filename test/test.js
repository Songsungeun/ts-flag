'use strict';
var expect = require('chai').expect;
let flag = require('../lib/ts_flag').TSFlag;
let args = [
    'name=IronMan', 
    'Type=Mark1', 
    'power=99', 
    'boolTest', 
    'heroes=Hulk,Thor,IronMan,Captain', 
    'powers=90,88,50',
    'detailPowers=90.3,88.6,50.2',
    'powerInit',
    'intArrInit',
    'nopower',
    'powerArr',
    'enemy',
    'weapon'

];
let tsFlag = new flag(args);

describe('Test', () => {
    // NOTE - bool Test
    it('should return true', () => {
        let result = tsFlag.bool('boolTest', false, 'test of boolean');
        expect(result).to.equal(true);
    })

    // NOTE - int Test
    // set options 99
    it('should return 99<int>', () => {
        let result = tsFlag.int('power', 0, 'power of suites');
        expect(result).to.equal(99);
    })
    // check Type
    it('should return number', () => {
        let result = tsFlag.int('power', 0, 'power of suites');
        expect(result).to.be.a('number');
    })
    // input option, but set value (expected return initial Value)
    it('should return 50(init Value)', () => {
        let result = tsFlag.int('powerInit', 50, 'power of suites');
        expect(result).to.equal(50);
    })
    // set int array option value
    it('should return int Array', () => {
        let result = tsFlag.intArr('powers', [], 'test of int Array');
        expect(result).to.eql([90, 88, 50]);
    })
    // input int array option, but not set value (expected return initial Value)
    it('should return [0,0,0]', () => {
        let result = tsFlag.intArr('intArrInit', [0,0,0], 'test init Array for int Array');
        expect(result).to.eql([0,0,0]);
    })

    // NOTE - float Test
    it('should return number 99<float>', () => {
        let result = tsFlag.int('power', 0, 'power of suites');
        expect(result).to.equal(99.0);
    })
    it('should return number 88.5<float> (initial Value)', () => {
        let result = tsFlag.int('nopower', 88.5, 'default power');
        expect(result).to.equal(88.5);
    })
    it('should return float Array', () => {
        let result = tsFlag.floatArr('detailPowers', [], 'test of float Array');
        expect(result).to.eql([90.3,88.6,50.2]);
    })
    it('should return float Array (init value)', () => {
        let result = tsFlag.float('powerArr', [20.4,30.6,40.7], 'test of float Array (init value)');
        expect(result).to.eql([20.4,30.6,40.7]);
    })

    // NOTE - string Test
    it('should return string', () => {
        let result = tsFlag.str('name', '', 'name of Heroes');
        expect(result).to.be.a('string');
    })
    it('should return Mark1', () => {
        let result = tsFlag.str('Type', '', 'type of suites');
        expect(result).to.equal('Mark1');
    })
    it('should return Billen (init value)', () => {
        let result = tsFlag.str('enemy', 'Billen', 'check initial String Value');
        expect(result).to.equal('Billen');
    })
    it('should return string Array', () => {
        let result = tsFlag.strArr('heroes', [], 'test of string Array');
        expect(result).to.eql(["Hulk", "Thor", "IronMan", "Captain"]);
    })
    it('should return string Array (init value)', () => {
        let result = tsFlag.strArr('weapon', ['sword', 'knife', 'gun'], 'test of string Array init value');
        expect(result).to.eql(['sword', 'knife', 'gun']);
    })
    it('check Fail', () => {
        expect(tsFlag.str.bind('check', '', 'check Error')).to.throw();
        expect(tsFlag.int.bind('check', '', 'check Error')).to.throw();
        expect(tsFlag.float.bind('check', '', 'check Error')).to.throw();
    })

    // NOTE - util Func
    it('should return find index', () => {
        let result = tsFlag.getOptionIndex('Type')
        expect(result).to.equal(1);
    })

    it('should return args length', () => {
        let result = tsFlag.NFlag()
        expect(result).to.equal(13);
    })
})