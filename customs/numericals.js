const BN = require('bignumber.js')
const bn = x => new BN(x)

module.exports = [
  {
    name: 'decimal',
    callbackFn: (v, rq, attr) =>
      bn(v)
        .shiftedBy(parseInt(rq, 10))
        .isInteger(),
    errorMessage: 'The :attribute exceeds decimal place requirement',
  },

  {
    name: 'positive',
    callbackFn: (v, rq, attr) => bn(v).gt(0),
    errorMessage: 'The :attribute is not a positive numerical',
  },

  {
    name: 'nonnegative',
    callbackFn: (v, rq, attr) => bn(v).gte(0),
    errorMessage: 'The :attribute is not a nonnegative numerical',
  },

  {
    name: 'negative',
    callbackFn: (v, rq, attr) => bn(v).lt(0),
    errorMessage: 'The :attribute is not a negative numerical',
  },
]
