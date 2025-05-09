import { createSuffixSelector } from '../utils/createSuffixSelector'
import { VowelHeight } from '../../core/enums'
import { Word } from '../../core/Word'

export const PLURAL_CONJUGATION = 'k'

export const plural = (word: string) => {
  const getForcedHeight = (word: string): VowelHeight | undefined => {
    const w = new Word(word)

    if (w.lastVowel.value === 'ö' && w.endsWithConsonantCongestion) {
      return VowelHeight.High
    }

    return undefined
  }

  return new Word(word).lastLetter.isConsonant
    ? createSuffixSelector({
        low: 'ok',
        high: 'ek',
        highRounded: 'ök',
        forceHeight: getForcedHeight(word),
      })(word)
    : word + PLURAL_CONJUGATION
}
