import { accusative, ACCUSATIVE_EXCEPTIONS } from './accusative'
import { createSuffixer, createSuffixSelector } from './create'
import { Exception } from './exceptions'

const ADJECTIVE_EXCEPTIONS: Exception[] = [
  ['Eger', 'egri'],
  [/halom$/, (w) => w.replace(/halom$/, 'halmi')],
]

export const suffix = {
  accusative: createSuffixer(accusative, ACCUSATIVE_EXCEPTIONS),
  ablative: createSuffixer(
    createSuffixSelector({
      low: 'tól',
      high: 'től',
    }),
  ),
  adessive: createSuffixer(
    createSuffixSelector({
      low: 'nál',
      high: 'nél',
    }),
  ),
  adjective: createSuffixer(
    (word) => (word.slice(-1) === 'i' ? word : `${word}i`),
    ADJECTIVE_EXCEPTIONS,
  ),
  allative: createSuffixer(
    createSuffixSelector({
      low: 'hoz',
      high: 'hez',
      highRounded: 'höz',
    }),
  ),
  finalCasual: createSuffixer((word) => `${word}ért`),
  dative: createSuffixer(
    createSuffixSelector({
      low: 'nak',
      high: 'nek',
    }),
  ),
  delative: createSuffixer(
    createSuffixSelector({
      low: 'ról',
      high: 'ről',
    }),
  ),
  elative: createSuffixer(
    createSuffixSelector({
      low: 'ból',
      high: 'ből',
    }),
  ),
  essiveFormal: createSuffixer((word) => `${word}ként`),
  essiveModal: createSuffixer(
    createSuffixSelector({
      low: 'ul',
      high: 'ül',
    }),
  ),
  illative: createSuffixer(
    createSuffixSelector({
      low: 'ba',
      high: 'be',
    }),
  ),
  insessive: createSuffixer(
    createSuffixSelector({
      low: 'ban',
      high: 'ben',
    }),
  ),
  instrumentalComitative: createSuffixer(
    createSuffixSelector({
      low: 'val',
      high: 'vel',
    }),
  ),
  locative: createSuffixer(
    createSuffixSelector({
      low: 'ott',
      high: 'ett',
      highRounded: 'ött',
    }),
  ),
  sublative: createSuffixer(
    createSuffixSelector({
      low: 'ra',
      high: 're',
    }),
  ),
  superessive: createSuffixer(
    createSuffixSelector({
      low: 'on',
      high: 'en',
      highRounded: 'ön',
    }),
  ),
  terminative: createSuffixer((word) => `${word}ig`),
  translative: createSuffixer(
    createSuffixSelector({
      low: 'vá',
      high: 'vé',
    }),
  ),
}
