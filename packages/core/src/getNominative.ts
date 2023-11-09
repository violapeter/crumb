import { Word } from './Word'

/**
 * Visszaadja egy szó határozott névelőjét
 *
 * @param {string} word
 * @return 'a' | 'az'
 */
export const getNominative = (word: string): string =>
  new Word(word).letters[0].isVowel ? 'az' : 'a'
