const R = require('ramda')
const BN = require('bignumber.js')
const bn = x => new BN(x)

/* rippple */
const { RippleAPI } = require('ripple-lib')

/* ethereum */
const web3 = require('web3-utils')

/* bitcoin */
const bitcoin = require('bitcoinjs-lib')
const networks = require('./bitcoin-networks')

/* litecoin */
const litecoin = require('litecore-lib')

const neitherCase =
  str => str.toUpperCase() !== str &&
    str.toLowerCase() !== str

const isNil =
  x =>
    x == null

module.exports = [
  [
    'bitcoinAddress',
    (v, req = 'mainnet', attr) =>
      R.tryCatch(
        () => bitcoin.address.toOutputScript(v, networks[`bitcoin-${req}`]) && true,
        () => false,
      )(v),
    'The :attribute is not a valid bitcoin address (networks?)',
  ],

  [
    'ethereumAddress',
    (v, req = 'checked', attr) =>
      (req === 'unchecked')
        ? web3.isAddress(v)
        : neitherCase(v) && web3.isAddress(v),
    'The :attribute is not a valid ethereum address (checksum?)',
  ],

  [
    'rippleAddress',
    (v, req, attr) => new RippleAPI().isValidAddress(v),
    'The :attribute is not a valid ripple address',
  ],

  [
    'litecoinAddress',
    (v, req = 'mainnet', attr) =>
      isNil(
        litecoin.Address.getValidationError(
          v,
          req === 'mainnet' ? 'livenet' : 'testnet',
        ),
      ),
    'The :attribute is not a valid litecoin address (networks?)',
  ],

  [
    'rippleTag',
    (v, req, attr) =>
      bn(v).isInteger() &&
      bn(v).gte(0) &&
      bn(v).lte(2 ** 32 - 1),
    'The :attribute is not a valid ripple tag (32-bit unsigned integer)',
  ],

  [
    'eosMemo',
    (v, req, attr) =>
      typeof v === 'string' &&
      v.length > 0 &&
      v.length <= 256,
    'The :attribute is not a valid eos memo (a nonempty string of length <= 256)',
  ],
]
