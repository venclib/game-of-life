
const nextStateService = require('./next-state.service')
var chai = require('chai');
var expect = chai.expect;

describe('Next state service', function () {
  var blinkeBoard = [
    [false,false,false,false,false],
    [false,false,true,false,false],
    [false,false,true,false,false],
    [false,false,true,false,false],
    [false,false,false,false,false]
]
  it('get next blinker state', function () {
      
     var result = nextStateService.getNextState(blinkeBoard);
     expect(result[2][1]).to.eql(true);
     expect(result[2][2]).to.eql(true);
     expect(result[2][3]).to.eql(true);

     expect(result[1][2]).to.eql(false);
     expect(result[3][2]).to.eql(false);
  })

  it('get second blinker state', function () {
      
     var result = nextStateService.getNextState(blinkeBoard);
     var result = nextStateService.getNextState(result);
     expect(result[2][1]).to.eql(false);
     expect(result[2][2]).to.eql(true);
     expect(result[2][3]).to.eql(false);

     expect(result[1][2]).to.eql(true);
     expect(result[3][2]).to.eql(true);
  })
})