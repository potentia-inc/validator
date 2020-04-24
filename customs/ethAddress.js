const BN = require('bn.js')
const Hash = require('eth-lib/lib/hash')
const _ = require('underscore')

const SHA3_NULL_S = '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470'

function isAddress (address) {
  // check if it has the basic requirements of an address
  if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
    return false
    // If it's ALL lowercase or ALL upppercase
  } else if (/^(0x|0X)?[0-9a-f]{40}$/.test(address) || /^(0x|0X)?[0-9A-F]{40}$/.test(address)) {
    return true
    // Otherwise check each case
  } else {
    return checkAddressChecksum(address)
  }
}

function checkAddressChecksum (address) {
  // Check each case
  address = address.replace(/^0x/i, '')
  var addressHash = sha3(address.toLowerCase()).replace(/^0x/i, '')

  for (var i = 0; i < 40; i++) {
    // the nth letter should be uppercase if the nth digit of casemap is 1
    if ((parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i]) || (parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i])) {
      return false
    }
  }
  return true
}

function sha3 (value) {
  if (isBN(value)) {
    value = value.toString()
  }

  if (isHexStrict(value) && /^0x/i.test((value).toString())) {
    value = hexToBytes(value)
  }

  var returnValue = Hash.keccak256(value) // jshint ignore:line

  if (returnValue === SHA3_NULL_S) {
    return null
  } else {
    return returnValue
  }
}

const isBN = object => BN.isBN(object)

const isHexStrict = hex => ((_.isString(hex) || _.isNumber(hex)) && /^(-)?0x[0-9a-f]*$/i.test(hex))

function hexToBytes (hex) {
  hex = hex.toString(16)

  if (!isHexStrict(hex)) {
    throw new Error('Given value "' + hex + '" is not a valid hex string.')
  }

  hex = hex.replace(/^0x/i, '')

  for (var bytes = [], c = 0; c < hex.length; c += 2) {
    bytes.push(parseInt(hex.substr(c, 2), 16))
  }
  return bytes
}

module.exports = { isAddress }

