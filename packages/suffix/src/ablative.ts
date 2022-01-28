import { createSuffixSelector } from './create'
import { VowelHeight } from '@hungrammar/core'
import { Exception } from './exceptions'

export const ABLATIVE_EXCEPTIONS: Exception[] = [
  ['aki', 'akitől'],
  [/valaki$/, (w) => w.replace(/valaki$/, 'valakitől')],
]

const FORCED_LOW_VOWEL_HEIGHT = [
  'abszolúte',
  'acél',
  'addigi',
  'hátralék',
  'adalék',
  'affér',
  'aggaték',
  'hasadék',
  'akadék',
  'ajándék',
  'aktív',
  'honnét',
  'agilis',
]
const FORCED_HIGH_VOWEL_HEIGHT = ['ív', 'tiszt', 'akárki', 'akármi', 'akármint']

const endsWithArray = (arrayOfWords: string[], word: string): boolean =>
  new RegExp(`(${arrayOfWords.join('|')})$`).test(word)

export const ablative = (word: string) =>
  createSuffixSelector({
    low: 'tól',
    high: 'től',
    forceHeight: endsWithArray(FORCED_LOW_VOWEL_HEIGHT, word)
      ? VowelHeight.Low
      : endsWithArray(FORCED_HIGH_VOWEL_HEIGHT, word)
      ? VowelHeight.Low
      : undefined,
  })(word)
