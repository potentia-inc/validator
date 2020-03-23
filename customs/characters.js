module.exports = [
  [
    /*
     * reference: https://en.cppreference.com/w/cpp/string/byte/isprint
     *   space:         20
     *   punctuations:  21-2F !"#$%&'()*+,-./
     *   digit:         30-39 0123456789
     *   punctuations:  3A-40 :;<=>?@
     *   upper letters: 41-5A ABCDEFGHIJKLMNOPQRSTUVWXYZ
     *   punctuations:  5B-60 [\]^_`
     *   lower letters: 61-7A abcdefghijklmnopqrstuvwxyz
     *   punctuations:  7B-7E {|}~
     */
    'isprint',
    (v, req, attr) =>
      typeof v === 'string' &&
      /^[\x20-\x7e]*$/g.test(v),
    'The :attribute contains invalid characters (printable?)',
  ],
]
