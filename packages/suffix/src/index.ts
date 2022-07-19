import { createSuffixer } from './utils/createSuffixer'
import { createSuffixSelector } from './utils/createSuffixSelector'
import { genitive } from './case/genitive'
import { accusative, ACCUSATIVE_CONJUGATION } from './case/accusative'
import { ablative, ABLATIVE_EXCEPTIONS } from './case/ablative'
import { adjective, ADJECTIVE_EXCEPTIONS } from './case/adjective'
import { plural, PLURAL_CONJUGATION } from './case/plural'
import { createGeneralExceptions } from './utils/createGeneralExceptions'
import { comparative, superlative, excessive, GRADE_CONJUGATION } from './gradation/gradation'
import { finalCasual } from './case/finalCasual'
import { privative, PRIVATIVE_EXCEPTIONS } from './case/privative'

export const suffix = {
  accusative: createSuffixer(accusative, createGeneralExceptions(ACCUSATIVE_CONJUGATION)),
  ablative: createSuffixer(ablative, ABLATIVE_EXCEPTIONS),
  adessive: createSuffixer(
    createSuffixSelector({
      low: 'nál',
      high: 'nél',
    }),
  ),
  adjective: createSuffixer(adjective, ADJECTIVE_EXCEPTIONS),
  allative: createSuffixer(
    createSuffixSelector({
      low: 'hoz',
      high: 'hez',
      highRounded: 'höz',
    }),
  ),
  finalCasual: createSuffixer(finalCasual),
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
  privative: createSuffixer(privative, PRIVATIVE_EXCEPTIONS),
  plural: createSuffixer(plural, createGeneralExceptions(PLURAL_CONJUGATION)),
  genitive,
  temporal: createSuffixer((word) => `${word}kor`),
  sociative: createSuffixer(
    createSuffixSelector({
      low: 'stul',
      high: 'stül',
    }),
    createGeneralExceptions({
      low: 'stul',
      high: 'stül',
    }),
  ),
  distributiveTemporal: createSuffixer(
    createSuffixSelector({
      low: 'onta',
      high: 'ente',
    }),
    createGeneralExceptions({
      low: 'nta',
      high: 'nte',
    }),
  ),
  distributive: createSuffixer(
    createSuffixSelector({
      low: 'onként',
      high: 'enként',
    }),
  ),
  formal: createSuffixer((word) => `${word}képpen`),
  modalEssive: createSuffixer(
    createSuffixSelector({
      low: 'ul',
      high: 'ül',
    }),
  ),
  multiplicative: createSuffixer(
    createSuffixSelector({
      low: 'szor',
      high: 'szer',
      highRounded: 'ször',
    }),
  ),
  frequentative: createSuffixer(
    createSuffixSelector({
      low: 'gat',
      high: 'get',
    }),
  ),
}

export const grade = {
  comparative: createSuffixer(comparative, createGeneralExceptions(GRADE_CONJUGATION)),
  superlative: createSuffixer(superlative, createGeneralExceptions(GRADE_CONJUGATION)),
  excessive: createSuffixer(excessive, createGeneralExceptions(GRADE_CONJUGATION)),
}
