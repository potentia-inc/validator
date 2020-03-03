const R = require('ramda')
const S = require('sanctuary')
const Validator = require('validatorjs')
const uncurry = fn => arr => arr.reduce((f, c) => f(c), fn)
const ap = uncurry(S.ap)

const rulesExample = {
  foo: 'required|string|between:3,10',
  bar: 'integer|min:7',
}

const capital = [
  /* name */ 'capital',
  /* callbackFn */ (v, req, attr) => v.toUpperCase() === v,
  /* errorMessage */ 'The :attribute is not in capital case',
]

/**
 *
 * A wrapper for validatorjs, validate data object based on rule(s).
 *
 * ```javascript
 * > rule = { foo: 'required|string|between:3,10' }
 * > validator ([]) (rule) ({ foo: 'abc' }) // => Right ({ foo: 'abc' })
 * > validator ([]) (rule) ({ foo: 'a' }) // => Left ('...error message.')
 * ```
 */

// :: [CustomValidation] -> Rule -> Object -> S.Either String Object
module.exports =
  (customs = [capital]) => {
    register(customs)
    return (
      (rules = rulesExample) =>
        ap([
          obj => v => v.passes() ? S.Right(obj) : S.Left(R.toString(v.errors.errors)),
          obj => new Validator(obj, rules),
        ])
    )
  }

function register (customs) {
  customs.forEach(([name, callbackFn, errorMessage]) => {
    Validator.register(name, callbackFn, errorMessage)
  })
}
