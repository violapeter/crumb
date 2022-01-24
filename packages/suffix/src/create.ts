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

export const createSuffixSelector =
  ({ low, high, highRounded, forceHeight }: SuffixOptions) =>
  (word: string): string =>
    ({
      [VowelHeight.High]: word + high,
      [VowelHeight.HighRounded]: word + (highRounded ?? high),
      [VowelHeight.Low]: word + low,
    }[forceHeight || new Word(word).vowelHeight])
