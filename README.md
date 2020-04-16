# validator

## First

see https://github.com/skaterdav85/validatorjs

## Usage

```bash
npm i git://github.com/potentia-inc/validator.git#v1.2.x
```

```javascript
const validator = require('validator')
const S = require('sanctuary')

const rule = { foo: 'required|string|between:3,10' }

validator (rule) ({ foo: 'abc' })  // => Right ({ foo: 'abc' })
validator (rule) ({ foo: 'a' })  // => Left ('...failure message.')

const v = validator(rule)(obj)
if (S.isLeft(v)) { console.error(v.value) /* validation failed */ }
if (S.isRight(v)) { console.log('passed!', v.value) /* validation passed */ }
```

## Signature For The Main Validator Function

```javascript
// validator :: Rule -> Object -> S.Either String Object
```

* `Rule` is an alias type for ordinary object.
* `Object` is the type for input object.
* When the validation is passed, the output will be a Either Right with value the same as input object.
* When the validation is failed, the output will be a Either Left with value a string of informative failure reason.

## Rules For Crypto-addresses

* Bitcoin: ``rule = { address: `required|string|bitcoinAddress:${network}` } // network: 'mainnet' | 'testnet'``
* Litecoin: ``rule = { address: `required|string|litecoinAddress:${network}` } // network: 'mainnet' | 'testnet'``
* Etherem: ``rule = { address: `required|string|ethereumAddress:${check}` } // check: 'checked' | 'unchecked'``
* Ripple: ``rule = { address: `required|string|rippleAddress` }``

> Note: The following addresses are NOT supported:
> 1) Litecoin deprecated mainnet p2sh addresses `3...`
> 2) Litecoin deprecated testnet p2sh addresses `2...`
> 3) Litecoin mainnet bech32 addresses `ltc...`
> 4) Litecoin testnet bech32 addresses `tltc...`

## Rules For Crypto-address-tags

* Ripple Tag: ``rule = { tag: 'string|rippleTag' }``
* EOS Memo: ``rule = { tag: 'string|eosMemo' }``

## Misc. Rules

* Decimal Place: `rule = { amount: 'required|string|numeric|decimal:5' }`
  * `{ amount: '0.0001' } // passed`
  * `{ amount: '0.00001' } // passed`
  * `{ amount: '0.000010000' } // passed`
  * `{ amount: '0.000001' } // failed`

* Positivity: `rule = { amount: 'required|string|numeric|positive' }`
  * `{ amount: '0.0001' } // passed`
  * `{ amount: '+0.0001' } // passed`
  * `{ amount: '-0.00001' } // failed`

* Printable: `rule = { client_id: 'required|string|isprint' }`
  * `{ client_id: 'alice' } // passed`
  * `{ client_id: '_bob' } // passed`
  * `{ client_id: '!carol ' } // passed`
  * `{ client_id: "dave\x01" } // failed`

## Note

> It is recommended to add a `string` requirement to all rules when validating addresses, tags, amounts.

* https://support.exodus.io/article/828-what-are-destination-tags-and-how-do-i-use-them
* https://github.com/skaterdav85/validatorjs

