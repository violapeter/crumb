import fs from 'fs'
import { VowelHarmony, Word } from '@hungrammar/core'

fs.readFile('./fixtures/magyar_szavak_utf8.txt', 'utf-8', (err, data) => {
  if (err) throw err

  const isInvalid = (w: string): boolean => /–|-|,\s|\s/gi.test(w)

  const newData = data
    .split('\r\n')
    .filter((w) => !isInvalid(w))
    .map((word) => {
      try {
        return new Word(word)
      } catch (e) {
        console.log('hibás bemenet: ' + word)
      }
    })
    .filter((w) => w && w.vowelHarmony === VowelHarmony.Mixed)
    .map((w) => w && w.value)
    .join('\n')

  fs.writeFile('./fixtures/mixedVowelHarmony.txt', newData, (err) => {
    console.log(err)
  })
})
