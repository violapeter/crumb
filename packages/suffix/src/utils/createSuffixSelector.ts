import { VowelHeight, Word } from '@crumb/core'
import { assimilate } from './assimilation'

export interface SuffixOptions {
  /** A mély hangrendű toldalék */
  low: string
  /** A magas hangrendű toldalék */
  high: string
  /** A magas hangrendű, kerekített toldalék */
  highRounded?: string
  /** Ha `VowelHeight` az érték, akkor mindegy a szó hangrendje,
   * a megfelelő hangmagasságú toldalékot választja ki. */
  forceHeight?: VowelHeight
}

/**
 * Kiválasztja a megfelelő toldalékot a szó
 * magánhangzó-magassága alapján
 */
export const selectSuffix = (word: string, { low, high, highRounded }: SuffixOptions): string =>
  ({
    [VowelHeight.High]: high,
    [VowelHeight.HighRounded]: highRounded ?? high,
    [VowelHeight.Low]: low,
  })[new Word(word).vowelHeight]

/**
 * Factory metódus egy toldalékválasztóhoz.
 *
 * @example
 * const mySuffixer = createSuffixer({
 *   low: 'on',
 *   high: 'en',
 *   highRounded: 'ön',
 * })
 *
 * mySuffixer('kalapács') // returns "kalapácson"
 */
export const createSuffixSelector =
  ({ low, high, highRounded, forceHeight }: SuffixOptions) =>
  (word: string): string =>
    ({
      [VowelHeight.High]: assimilate(word, high),
      [VowelHeight.HighRounded]: assimilate(word, highRounded ?? high),
      [VowelHeight.Low]: assimilate(word, low),
    })[forceHeight || new Word(word).vowelHeight]
