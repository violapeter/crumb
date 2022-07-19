import { Word } from './Word'

export const reverseLastVowel = ({ letters, lastVowel }: Word): Word =>
  new Word(
    letters
      .map((letter, index) =>
        letters.lastIndexOf(lastVowel) === index ? letter.opposite : letter.value,
      )
      .join(''),
  )
