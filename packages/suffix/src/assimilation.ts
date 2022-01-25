import { Word } from '@hungrammar/core'

/**
 * @example
 *
 * assimilate('agónia') // returns "agóniá"
 * assimilate('karate') // returns "karaté"
 */
export const assimilate = (word: string): string =>
  /[ae]$/.test(word) ? word.slice(0, -1) + new Word(word).lastLetter.opposite : word
