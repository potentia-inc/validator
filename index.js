const R = require('ramda')
const S = require('sanctuary')
const Validator = require('validatorjs')
const uncurry = fn => arr => arr.reduce((f, c) => f(c), fn)
const ap = uncurry(S.ap)
/**
 *
 * A wrapper for validatorjs, validate data object based on rule(s).
 *
 * ```javascript
 * >
 * > const validator = require('validator')
 * > const S = require('sanctuary')
 *
 * > rule = { foo: 'required|string|between:3,10' }
 * > validator (rule) ({ foo: 'abc' })  // => Right ({ foo: 'abc' })
 * > validator (rule) ({ foo: 'a' })  // => Left ('...failure message.')
 * >
 * > const v = v(rule)
 * > if (S.isLeft(v(obj))) { console.error(v.value) // validation failed }
 * > if (S.isRight(v(obj))) { console.log('passed!') // validation passed }
 * ```
 */

const customsExample = [
  /* name */ 'capital',
  /* callbackFn */ (v, req, attr) => v.toUpperCase() === v,
  /* errorMessage */ 'The :attribute is not in capital case',
]

const rulesExample = {
  foo: 'required|string|between:3,10',
  bar: 'integer|min:7',
}

// :: Array CustomValidation -> Rule -> Object -> S.Either String Object
const customValidation =
  (customs = [customsExample]) => {
    customs.forEach(([name, callbackFn, errorMessage]) => {
      Validator.register(name, callbackFn, errorMessage)
    })
    return (
      (rules = rulesExample) =>
        ap([
          obj => v => v.passes() ? S.Right(obj) : S.Left(R.toString(v.errors.errors)),
          obj => new Validator(obj, rules),
        ])
    )
  }

module.exports = customValidation(require('./customs'))
