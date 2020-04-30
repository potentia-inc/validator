const R = require('ramda')
const BN = require('bignumber.js')
const bn = x => new BN(x)

/* rippple */
// const { RippleAPI } = require('ripple-lib')
const ripple = require('ripple-address-codec')

/* ethereum */
const ethAddress = require('./ethAddress.js')

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
    'ethereumAddress',
    (v, req = 'checked', attr) =>
      (req === 'unchecked')
        ? ethAddress.isAddress(v)
        : neitherCase(v) && ethAddress.isAddress(v),
    'The :attribute is not a valid ethereum address (checksum?)',
  ],

  [
    'rippleAddress',
    (v, req = 'classic', attr) =>
      (req === 'classic')
        ? ripple.isValidClassicAddress(v)
        : ripple.isValidXAddress(v),
    'The :attribute is not a valid ripple address (X-Address?)',
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

  /**
   * Stellar Lumens Memo:
   * The memo contains optional extra information. It is the responsibility of the client to interpret this value. Memos can be one of the following types:
   *
   *   MEMO_TEXT : A string encoded using either ASCII or UTF-8, up to 28-bytes long.
   *   MEMO_ID : A 64 bit unsigned integer.
   *   MEMO_HASH : A 32 byte hash.
   *   MEMO_RETURN : A 32 byte hash intended to be interpreted as the hash of the transaction the sender is refunding.
   *
   */
  [
    'stellarLumensMemo',
    (v, req, attr) =>
      typeof v === 'string' &&
      v.length > 0 &&
      v.length <= 28,
    'The :attribute is not a valid stella lumens memo (a nonempty string of length <= 28)',
  ],
]

