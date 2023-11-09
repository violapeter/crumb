import { Word } from '@crumb/core'
import { getStopWord } from './stopWord'

export type StopWord = string | RegExp

const getSyllablesOfPart = (string: string): string[] => {
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

export const getSyllablesOfFullWord = (
  string: string,
  stopWords?: StopWord | StopWord[],
): string[] => {
  if (stopWords) {
    const stopWordPart = getStopWord(string, stopWords)
    if (stopWordPart) {
      const [, otherPart] = string.split(stopWordPart)
      return getSyllablesOfPart(stopWordPart).concat(getSyllablesOfPart(otherPart))
    }
  }

  return getSyllablesOfPart(string)
}

export function getSyllables(
  word: string,
  options?: { stopWords?: StopWord | StopWord[]; formatted?: true; hyphenCharacter?: string },
): string

export function getSyllables(
  word: string,
  options?: { stopWords?: StopWord | StopWord[]; formatted?: false; hyphenCharacter?: string },
): string[]

export function getSyllables(
  word: string,
  options: { stopWords?: StopWord | StopWord[]; formatted?: boolean; hyphenCharacter?: string } = {
    formatted: false,
  },
) {
  const syllables = getSyllablesOfFullWord(word, options?.stopWords)
  return options?.formatted ? syllables.join(options.hyphenCharacter || '-') : syllables
}
