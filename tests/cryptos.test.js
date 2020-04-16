/* eslint-env node, jest */
const validator = require('..')
const R = require('ramda')
const S = require('sanctuary')
const crypto = require('crypto')

const rand =
  (n = 32) =>
    crypto
      .randomBytes(n)
      .toString('hex')

const randInt =
  (max = 2 ** 32) =>
    Math.floor(Math.random() * max)

const btcMainnet = 'bitcoinAddress:mainnet'
const btcTestnet = 'bitcoinAddress:testnet'
const ltcMainnet = 'litecoinAddress:mainnet'
const ltcTestnet = 'litecoinAddress:testnet'
const ethChecked = 'ethereumAddress:checked'
const ethUnchecked = 'ethereumAddress:unchecked'
const xrpClassic = 'rippleAddress:classic'
const xrpXAddress = 'rippleAddress:xaddress'

const networks = [
  btcMainnet,
  btcTestnet,
  ltcMainnet,
  ltcTestnet,
  ethChecked,
  ethUnchecked,
  xrpClassic,
  xrpXAddress,
]

const addresses = {
  '17VZNX1SN5NtKa8UQFxwQbFeFc3iqRYhem': [btcMainnet], // 0x00 p2pkh
  '2MzQwSSnBHWHqSAqtTVQ6v47XtaisrJa1Vc': [btcTestnet/*, ltcTestnet */], // 0xC4 p2sh
  '2N6Jsj94tLbnJ3Ph52opQBkL7ZBWPRcgFVL': [btcTestnet/*, ltcTestnet */], // 0xC4 p2sh
  '3EktnHQD7RiAE6uzMj2ZifT9YgRrkSgzQX': [btcMainnet/*, ltcMainnet */], // 0x05 p2sh
  '3Fg1gezXg9VrBy8MDkkgjRSWixC6bwJ25B': [btcMainnet/*, ltcMainnet */], // 0x05 p2sh
  mipcBbFg9gMiCh81Kj8tqqdgoZub1ZJRfn: [btcTestnet, ltcTestnet], // 0x6F p2pkh
  n4dESXfgxPHfqDdXp4Z2EUbWUL9dkCb2um: [btcTestnet, ltcTestnet], // 0x6F p2pkh
  MTf4tP1TCNBn8dNkyxeBVoPrFCcVzxJvvh: [/* blank */ltcMainnet], // 0x32 p2sh
  QVk4MvUu7Wb7tZ1wvAeiUvdF7wxhvpyLLK: [/* blank */ltcTestnet], // 0x3A p2sh
  LM2WMpR1Rp6j3Sa59cMXMs1SPzj9eXpGc1: [/* blank */ltcMainnet], // 0x30 p2pkh

  bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4: [btcMainnet], // bech32
  tb1qw508d6qejxtdg4y5r3zarvary0c5xw7kxpjzsx: [btcTestnet], // bech32
  ltc1qg64xzud4mgetv5sp2frrjza7ayt8vj7w29gw9e: [/* ltcMainnet */], // bech32
  tltc1qlr9vv03y4tczv62fqackkpqrgfhtu68kkc3cv6: [/* ltcTestnet */], // bech32

  '0xdAC17F958D2ee523a2206206994597C13D831ec7': [ethChecked, ethUnchecked],
  '0xdac17f958d2ee523a2206206994597c13d831ec7': [ethUnchecked],
  '0x6e3954bB9447eF184364c28F1653488e15BC3eA9': [ethChecked, ethUnchecked],
  '0x6e3954bb9447ef184364c28f1653488e15bc3ea9': [ethUnchecked],

  rEb8TK3gBgk5auZkwc6sHnwrGVJH8DuaLh: [xrpClassic],
  r3sNQ2byJykFDV3dN2qPaFuJympgbcHaZY: [xrpClassic],
  XVH3aqvbYGhRhrD1FYSzGooNuxdzbGn9rLw4BsCrDQy2L2y: [xrpXAddress],
  X7iVhLD7tEybVJQpmtDJ8TLBsdYpm25oQ7HH3zrZ7MxERAw: [xrpXAddress],

  [rand(1)]: [],
  [rand(2)]: [],
  [rand(4)]: [],
  [rand(8)]: [],
  [rand(16)]: [],
  [rand(32)]: [],
  [rand(64)]: [],
  [rand(128)]: [],
  '': networks, // empty is allowed for all networks
}

const match =
  matrix =>
    (n, a) => // :: (Network, Address)
      R.includes(n, matrix[a])

test('addresses', () => {
  const xs = networks
  const ys = R.keys(addresses)
  const validate =
    (x, y) => // :: (Network, Address)
      match(addresses)(x, y)
        ? expect(S.isRight(validator({ address: x })({ address: y }))).toBe(true)
        : expect(S.isLeft(validator({ address: x })({ address: y }))).toBe(true)

  /* Do a comprehensive cross tests (networks X addresses) */
  R.liftN(2)(validate)(xs, ys)
  /* */
})

const xrpTag = 'rippleTag'
const eosMemo = 'eosMemo'
const xlmMemo = 'stellarLumensMemo'

const _networks = [
  xrpTag,
  eosMemo,
  xlmMemo,
]

const _tags = {
  0: [xrpTag, eosMemo, xlmMemo],
  1: [xrpTag, eosMemo, xlmMemo],
  '00': [xrpTag, eosMemo, xlmMemo],
  '01': [xrpTag, eosMemo, xlmMemo],
  [`${2 ** 32 - 1}`]: [xrpTag, eosMemo, xlmMemo],
  [`${randInt(2 ** 32)}`]: [xrpTag, eosMemo, xlmMemo],
  [`${2 ** 32}`]: [eosMemo, xlmMemo],

  hello: [eosMemo, xlmMemo],
  ' world!': [eosMemo, xlmMemo],
  [rand(14)]: [eosMemo, xlmMemo],
  [rand(14) + 'x']: [eosMemo],
  [rand(128)]: [eosMemo],
  [rand(128) + 'x']: [],

}

test('tags', () => {
  const xs = _networks
  const ys = R.keys(_tags)
  const validate =
    (x, y) => // :: (Network, Tag)
      match(_tags)(x, y)
        ? expect(S.isRight(validator({ tag: x })({ tag: y }))).toBe(true)
        : expect(S.isLeft(validator({ tag: x })({ tag: y }))).toBe(true)

  /* Do a comprehensive cross tests (networks X tags) */
  R.liftN(2)(validate)(xs, ys)
  /* */
})
