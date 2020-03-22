const { RippleAPI } = require('ripple-lib')
module.exports = [
  [
    /* name */ 'lowercase',
    /* callbackFn */ (v, req, attr) => v.toLowerCase() === v,
    /* errorMessage */ 'The :attribute is not in lower case',
  ],
  [
    'rippleAddress',
    (v, req, attr) => new RippleAPI().isValidAddress(v),
    'The :attribute is not a ripple address',
  ],
]
