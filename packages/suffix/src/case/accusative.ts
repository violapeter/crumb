import { VowelHarmony, VowelHeight, Word } from '@crumb/core'
import { createSuffixSelector } from '../utils/createSuffixSelector'
import { Exception, handleExceptions, mergeExceptionArrays } from '../utils/exceptions'
import { createGeneralExceptions } from '../utils/createGeneralExceptions'

export const ACCUSATIVE_CONJUGATION = 't'

export const BASE_EXCEPTIONS: Exception[] = [
  ['én', 'engem'],
  ['te', 'téged'],
  ['mi', 'minket'],
  ['ti', 'titeket'],
  [/csimpánz$/, (w) => w.replace(/csimpánz$/, 'csimpánzt')],
]

const getForcedVowelHeight = ({
  vowels,
  lastVowel,
  vowelHarmony,
}: Word): VowelHeight | undefined => {
  if (vowels.length === 1) {
    if (lastVowel.isFrontVowel && lastVowel.value !== 'ő') {
      return VowelHeight.High
    }

    if (lastVowel.isBackVowel) {
      return VowelHeight.Low
    }
  }

  if (vowelHarmony === VowelHarmony.Mixed && lastVowel.value === 'é') {
    return VowelHeight.Low
  }

  return undefined
}

export const accusative = (word: string) => {
  const w = new Word(word)

  const ACCUSATIVE_EXCEPTIONS = mergeExceptionArrays(
    BASE_EXCEPTIONS,
    createGeneralExceptions(ACCUSATIVE_CONJUGATION)(w),
  )

  const exception = handleExceptions(word, ACCUSATIVE_EXCEPTIONS)

  if (exception) {
    return exception
  }

  const { lastLetter, endsWithConsonantCongestion } = w

  if (lastLetter.isVowel) {
    if (/[ae]$/.test(word)) {
      return word.slice(0, -1) + lastLetter.opposite + ACCUSATIVE_CONJUGATION
    }

    return word + ACCUSATIVE_CONJUGATION
  }

  if (
    /([lnrsz]|ly|ny|sz|zs)$/.test(word) &&
    /^(.(?!cs$))+$/.test(word) &&
    !endsWithConsonantCongestion
  ) {
    return word + ACCUSATIVE_CONJUGATION
  }

  return createSuffixSelector({
    low: 'ot',
    high: 'et',
    highRounded: 'öt',
    forceHeight: getForcedVowelHeight(w),
  })(word)
}
