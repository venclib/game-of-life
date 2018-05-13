
const lifParser = require('./lif-parser.service')
var chai = require('chai');
var expect = chai.expect;

describe('Next state service', function () {
  var content = '#Life 1.05\n#D Pi Heptomino\n#D\n#D A common pattern in Life.\n#D\n' +
                '#D Pi = 3.141592653589793238\n#D\n#D See SPARK2PI, PIPUF, REVFUSE.\n#N\n' +
                '#P 3 3\n***\n*.*\n*.*'
  it('get live cordinates from file content', function () {
      
     var result = lifParser.parseLifFile(content).board;
     expect(result[0]).to.eql({column: 43, row: 43});
     expect(result[1]).to.eql({column: 44, row: 43});
     expect(result[2]).to.eql({column: 45, row: 43});
     expect(result[3]).to.eql({column: 43, row: 44});
     expect(result[4]).to.eql({column: 45, row: 44});
     expect(result[5]).to.eql({column: 43, row: 45});
     expect(result[6]).to.eql({column: 45, row: 45});
  })
})