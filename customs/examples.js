module.exports = [
  {
    name: 'lowercase',
    callbackFn: (v, req, attr) => v.toLowerCase() === v,
    errorMessage: 'The :attribute is not in lower case',
  },
]
