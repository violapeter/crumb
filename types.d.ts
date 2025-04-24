declare module 'crumbjs' {
  export type WordLike = string | RegExp | Array<string | RegExp>
  export type ExceptionHandler = string | ((string: string) => string)
  export type Exception = [WordLike, ExceptionHandler]
  export type SuffixerMethod = (
    word: string,
    exceptions?: Exception[],
  ) => string

  export type StopWord = string | RegExp

  export const suffix: {
    accusative: SuffixerMethod
    ablative: SuffixerMethod
    adessive: SuffixerMethod
    adjective: SuffixerMethod
    allative: SuffixerMethod
    finalCasual: SuffixerMethod
    dative: SuffixerMethod
    delative: SuffixerMethod
    elative: SuffixerMethod
    essiveFormal: SuffixerMethod
    essiveModal: SuffixerMethod
    illative: SuffixerMethod
    inessive: SuffixerMethod
    instrumentalComitative: SuffixerMethod
    locative: SuffixerMethod
    sublative: SuffixerMethod
    superessive: SuffixerMethod
    terminative: SuffixerMethod
    translative: SuffixerMethod
    privative: SuffixerMethod
    plural: SuffixerMethod
    genitive: SuffixerMethod
    temporal: SuffixerMethod
    sociative: SuffixerMethod
    distributiveTemporal: SuffixerMethod
    distributive: SuffixerMethod
    formal: SuffixerMethod
    modalEssive: SuffixerMethod
    multiplicative: SuffixerMethod
    frequentative: SuffixerMethod
  }

  export const grade: {
    comparative: SuffixerMethod
    superlative: SuffixerMethod
    excessive: SuffixerMethod
  }

  export function getNumberWithWords(number: number): string

  export function getSyllables(
    word: string,
    options?: {
      stopWords?: StopWord | StopWord[]
      formatted?: true
      hyphenCharacter?: string
    },
  ): string

  export function getSyllables(
    word: string,
    options?: {
      stopWords?: StopWord | StopWord[]
      formatted?: false
      hyphenCharacter?: string
    },
  ): string[]

  export function getSyllables(
    word: string,
    options?: {
      stopWords?: StopWord | StopWord[]
      formatted?: boolean
      hyphenCharacter?: string
    },
  ): string | string[]
}
