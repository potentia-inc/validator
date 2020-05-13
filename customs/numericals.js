const BN = require('bignumber.js')
const bn = x => new BN(x)

module.exports = [
  [
    'decimal',
    (v, rq, attr) =>
      bn(v)
        .shiftedBy(parseInt(rq, 10))
        .isInteger(),
    'The :attribute exceeds decimal place requirement',
  ],

  [
    'positive',
    (v, rq, attr) => bn(v).gt(0),
    'The :attribute is not a positive numerical',
  ],

  [
    'nonnegative',
    (v, rq, attr) => bn(v).gte(0),
    'The :attribute is not a nonnegative numerical',
  ],

  [
    'negative',
    (v, rq, attr) => bn(v).lt(0),
    'The :attribute is not a negative numerical',
  ],
]
