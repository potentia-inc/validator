# validator

##

```javascript
 const validator = require('validator')
 const S = require('sanctuary')

 rule = { foo: 'required|string|between:3,10' }
 validator (rule) ({ foo: 'abc' })  // => Right ({ foo: 'abc' })
 validator (rule) ({ foo: 'a' })  // => Left ('...failure message.')

 const v = v(rule)
 if (S.isLeft(v(obj))) { console.error(v.value) // validation failed }
 if (S.isRight(v(obj))) { console.log('passed!') // validation passed }
```

## Rules For Crypto-addresses

* Bitcoin: ``rule = { address: `required|string|bitcoinAddress:${network}` } // network: 'mainnet' | 'testnet'``
* Etherem: ``rule = { address: `required|string|ethereumAddress:${check}` } // check: 'checked' | 'unchecked'``
* Ripple: ``rule = { address: `required|string|rippleAddress` }``
