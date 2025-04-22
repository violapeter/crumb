import { Word } from '../../core/Word'

export type WordLike = string | RegExp | Array<string | RegExp>

export type ExceptionHandler = string | ((string: string) => string)

export type Exception = [WordLike, ExceptionHandler]

export type Exceptions = ((word: Word) => Exception[]) | Exception[]

export const matchesWord = (word: string, wordLike: WordLike) => {
  const matches = (matcher: string | RegExp) =>
    typeof matcher === 'string' ? matcher === word : matcher.test(word)
  return Array.isArray(wordLike) ? wordLike.some(matches) : matches(wordLike)
}

export const mergeExceptionArrays = (
  exceptions: Exception[],
  ...rest: Exception[][]
): Exception[] =>
  rest
    .reduceRight((acc, curr) => acc.concat(curr.reverse()), [])
    .concat(exceptions.reverse())

export const findFirstExceptionOfWord = (
  word: string,
  exceptions: Exception[],
  ...rest: Exception[][]
): Exception | undefined =>
  mergeExceptionArrays(exceptions, ...rest).find(([wordLike]) =>
    matchesWord(word, wordLike),
  )

export const handleExceptions = (
  word: string,
  exceptions: Exception[],
  ...rest: Exception[][]
): string | false => {
  const exception = findFirstExceptionOfWord(word, exceptions, ...rest)
  if (exception) {
    const [, handler] = exception
    return typeof handler === 'string' ? handler : handler(word)
  }

  return false
}
