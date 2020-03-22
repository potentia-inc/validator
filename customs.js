const { RippleAPI } = require('ripple-lib')
const web3 = require('web3-utils')

const neitherCase =
  str => str.toUpperCase() !== str &&
    str.toLowerCase() !== str

module.exports = [
  [
    /* name */ 'lowercase',
    /* callbackFn */ (v, req, attr) => v.toLowerCase() === v,
    /* errorMessage */ 'The :attribute is not in lower case',
  ],
  [
    'ethereumAddress',
    (v, req, attr) =>
      (req === 'unchecked')
        ? web3.isAddress(v)
        : neitherCase(v) !== v && web3.isAddress(v),
    'The :attribute is not a ripple address',
  ],
  [
    'rippleAddress',
    (v, req, attr) => new RippleAPI().isValidAddress(v),
    'The :attribute is not a ripple address',
  ],
]
