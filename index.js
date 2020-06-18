const S = require('sanctuary')
const Validator = require('validatorjs')

// ∷ Rule → Object → S.Either Object Object
module.exports = customValidation(require('./customs'))

/**
 *
 * A simple wrapper for validatorjs, which validate data object based on rule(s), features:
 *   curried parameters
 *   typed return value (Either)
 *
 * ```javascript
 *
 * const validator = require('validator')
 * const S = require('sanctuary')
 *
 * rule = { foo: 'required|string|between:3,10' }
 * validator (rule) ({ foo: 'abc' })  // => Right ({ foo: 'abc' })
 * validator (rule) ({ foo: 'a' })    // => Left ('...failure message.')
 *
 * const v = validator (rule)
 * if (S.isLeft (v (obj))) { console.error (v.value) } // validation failed
 * if (S.isRight (v (obj))) { console.log ('passed!') } // validation passed
 *
 * ```
 */

// ∷ [{ name, callbackFn, errorMessage }] → Rule → Object → S.Either Object Object
function customValidation (customs = []) {
  customs.forEach(c => { Validator.register(c.name, c.callbackFn, c.errorMessage) })
  return function (rule /* ∷ StrMap String */) {
    return function (obj) {
      const v = new Validator(obj, rule)
      return v.passes()
        ? S.Right(obj)
        : S.Left(v.errors.errors)
    }
  }
}
