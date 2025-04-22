import { Exception, Exceptions, handleExceptions } from './exceptions'
import { Word } from '../../core/Word'

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
