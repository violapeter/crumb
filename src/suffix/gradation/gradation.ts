import { Exception, handleExceptions } from '../utils/exceptions'
import { Word } from '../../core/Word'
import { VowelHeight } from '../../core/enums'
import { reverseLastVowel } from '../../core/reverseLastVowel'

export const GRADE_CONJUGATION = 'bb'
export const SUPERLATIVE_PREFIX = 'leg'
export const EXCESSIVE_PREFIX = 'leges'

export const GRADE_EXCEPTIONS: Exception[] = [
  [/kevés$/, (w) => w.replace(/kevés$/, 'kevesebb')],
  [/nehéz$/, (w) => w.replace(/nehéz$/, 'nehezebb')],
]

export const comparative = (word: string): string => {
  const exception = handleExceptions(word, GRADE_EXCEPTIONS)

  if (exception) {
    return exception
  }

  const w = new Word(word)
  const {
    lastLetter,
    lastVowel,
    vowelHeight,
    endsWithConsonantCongestion,
    vowels,
  } = w

  const getBindingPhoneme = () => {
    if (lastLetter.isVowel) {
      return ''
    }

    if (/[oóuúaá]/.test(lastVowel.value)) {
      return 'a'
    }

    if (vowelHeight === VowelHeight.Low) {
      return endsWithConsonantCongestion ? 'a' : 'o'
    }

    return 'e'
  }

  const getStem = () => {
    if (lastLetter.isVowel) {
      if (lastLetter.value === 'ó' && vowels.length !== 1) {
        return word
      }

      return reverseLastVowel(w).value
    }

    if (lastLetter.isVowel || lastVowel.isLongVowel) {
      return word
    }

    return word
  }

  return getStem() + getBindingPhoneme() + GRADE_CONJUGATION
}

export const superlative = (word: string): string => {
  return SUPERLATIVE_PREFIX + comparative(word)
}

export const excessive = (word: string): string => {
  return EXCESSIVE_PREFIX + SUPERLATIVE_PREFIX + comparative(word)
}
