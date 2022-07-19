import { Word } from '@crumb/core'
import { createSuffixSelector } from '../utils/createSuffixSelector'

export const PLURAL_CONJUGATION = 'k'

export const plural = (word: string) =>
  new Word(word).lastLetter.isConsonant
    ? createSuffixSelector({
        low: 'ok',
        high: 'ek',
        highRounded: 'ök',
      })(word)
    : word + PLURAL_CONJUGATION
