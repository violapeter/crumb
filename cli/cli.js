const fs = require('fs')
const { suffix } = require('../packages/suffix')

fs.readFile('./fixtures/magyar_szavak_utf8.txt', 'utf-8', (err, data) => {
  if (err) throw err

  const isInvalid = (w) => {
    return /–|-|,\s|\s/gi.test(w)
  }
  const newData = data
    .split('\r\n')
    .filter((w) => !isInvalid(w))
    .map((word) => {
      try {
        return suffix.accusative(word)
      } catch (e) {
        console.log('hibás bemenet: ' + word)
      }
    })
    .join('\n')

  fs.writeFile('./fixtures/accusative.txt', newData, (err) => {
    console.log(err)
  })
})
