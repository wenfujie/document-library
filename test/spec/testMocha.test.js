const Test = require('../need-test')
const expect = require('chai').expect

describe('加法测试', function () {
  it('1+1应该等于2', function () {
    expect(Test.add(1, 1)).to.be.equal(2)
  })
})
