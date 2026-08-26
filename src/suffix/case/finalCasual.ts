import { reverseLastVowel } from '../../core/reverseLastVowel.js'
import { Word } from '../../core/Word.js'

const FINAL_CASUAL_CONJUGATION = 'ért'

export const finalCasual = (word: string): string => {
  if (/[ae]$/.test(word)) {
    return reverseLastVowel(new Word(word)).value + FINAL_CASUAL_CONJUGATION
  }
  return word + FINAL_CASUAL_CONJUGATION
}
