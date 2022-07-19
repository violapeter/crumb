import { Word } from '@crumb/core'

export type StopWord = string | RegExp

export const getSyllables = (string: string, stopWords?: StopWord | StopWord[]): string[] => {
  const word = new Word(string)

  if (word.vowels.length === 1 || word.vowels.length === 0) {
    return [string]
  }

  const syllables: string[] = new Array(word.vowels.length).fill('')

  let syllableIndex = 0

  word.letters.forEach((letter, index, array) => {
    syllables[syllableIndex] += letter.value

    const hasVowel = new Word(syllables[syllableIndex]).vowels.length > 0
    const nextIsVowel = array[index + 1]?.isVowel
    const nextAfterIsVowel = array[index + 2]?.isVowel

    if (hasVowel) {
      if ((letter.isVowel && nextIsVowel) || nextAfterIsVowel) {
        syllableIndex++
      }
    }
  })

  return syllables
}
