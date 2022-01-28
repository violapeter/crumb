import { Word, VowelHeight } from '@hungrammar/core'
import { Exception, Exceptions, handleExceptions } from './exceptions'

export type SuffixerMethod = (word: string, exceptions?: Exception[]) => string

export const createSuffixer =
  (suffixerMethod: (word: string) => string, internalExceptions?: Exceptions): SuffixerMethod =>
  (word, exceptions = []) => {
    if (internalExceptions) {
      const internal = Array.isArray(internalExceptions)
        ? internalExceptions
        : internalExceptions(new Word(word))
      const exception = handleExceptions(word, internal, exceptions)

      if (exception) return exception
    }

    return suffixerMethod(word)
  }

interface SuffixOptions {
  low: string
  high: string
  highRounded?: string
  forceHeight?: VowelHeight
}

const assimilate = (word: string, suffix: string): string => {
  if (/[ae]$/.test(word)) {
    return word.slice(0, -1) + new Word(word).lastLetter.opposite + suffix
  }

  if (new RegExp(`${suffix.slice(0, 1).repeat(2)}$`).test(word)) {
    return word.slice(0, -1) + suffix
  }

  const { lastLetter, endsWithConsonantCongestion } = new Word(word)

  if (lastLetter.isConsonant && /^v/.test(suffix)) {
    return word + (endsWithConsonantCongestion ? '' : word.slice(-1)) + suffix.slice(1)
  }

  return word + suffix
}

export const createSuffixSelector =
  ({ low, high, highRounded, forceHeight }: SuffixOptions) =>
  (word: string): string =>
    ({
      [VowelHeight.High]: assimilate(word, high),
      [VowelHeight.HighRounded]: assimilate(word, highRounded ?? high),
      [VowelHeight.Low]: assimilate(word, low),
    }[forceHeight || new Word(word).vowelHeight])
