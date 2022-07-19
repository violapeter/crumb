import { Word } from './Word'

/**
 * Visszaadja egy szó határozott névelőjét
 *
 * @param {string} word
 * @return string
 */
export const getNominative = (word: string): string =>
  new Word(word).letters[0].isVowel ? 'az' : 'a'
