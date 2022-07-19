import { reverseLastVowel } from '../src/reverseLastVowel'
import { Word } from '../src/Word'

describe('reverse last vowel', () => {
  it('should set the opposite of the last vowel of a world', () => {
    expect(reverseLastVowel(new Word('kevés'))).toMatchObject(new Word('keves'))
    expect(reverseLastVowel(new Word('béka'))).toMatchObject(new Word('béká'))
    expect(reverseLastVowel(new Word('elé'))).toMatchObject(new Word('ele'))
  })
})
