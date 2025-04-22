import { Word } from '../../core/Word'
import { reverseLastVowel } from '../../core/reverseLastVowel'

/**
 * Asszimilálja a megfelelő toldalékot.
 *
 * @example
 * // returns "madárrá"
 * assimilate('madár', 'vá')
 *
 * @example
 * // returns "kacsává"
 * assimilate('kacsa', 'vá')
 */
export const assimilate = (word: string, suffix: string): string => {
  const w = new Word(word)
  const assimilatedSuffix = /o$/.test(new Word(suffix).letters[0].value)
    ? suffix.slice(1)
    : suffix

  if (/[ae]$/.test(word)) {
    return reverseLastVowel(w).value + assimilatedSuffix
  }

  if (new RegExp(`${suffix.slice(0, 1).repeat(2)}$`).test(word)) {
    return word.slice(0, -1) + suffix
  }

  const { lastLetter, endsWithConsonantCongestion } = new Word(word)

  if (lastLetter.isConsonant && /^v/.test(suffix)) {
    if (lastLetter.isMultipleDigit) {
      return (
        word.slice(0, -lastLetter.value.length) +
        lastLetter.longConsonant +
        suffix.slice(1)
      )
    }

    return (
      word +
      (endsWithConsonantCongestion ? '' : word.slice(-1)) +
      suffix.slice(1)
    )
  }

  return word + suffix
}
