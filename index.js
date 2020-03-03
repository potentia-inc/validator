const R = require('ramda')
const S = require('sanctuary')
const Validator = require('validatorjs')
const uncurry = fn => arr => arr.reduce((f, c) => f(c), fn)
const ap = uncurry(S.ap)

const rulesExample = {
  foo: 'required|string|between:3,10',
  bar: 'integer|min:7',
}
/**
 * :: Rule -> Object -> S.Either String Object
 *
 * A wrapper for validatorjs, validate data object based on rule(s).
 *
 * ```javascript
 * > rule = { foo: 'required|string|between:3,10' }
 * > validator (rule) ({ foo: 'abc' }) // => Right ({ foo: 'abc' })
 * > validator (rule) ({ foo: 'a' }) // => Left (...)
 * ```
 */
const validator =
  (rules = rulesExample) =>
    obj =>
      ap([
        o => v => v.passes() ? S.Right(o) : S.Left(R.toString(v.errors)),
        o => new Validator(o, rules),
      ])(obj)

module.exports = { validator }
