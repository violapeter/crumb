import { Word } from '@crumb/core'
import { Exception } from './exceptions'
import { selectSuffix, SuffixOptions } from './createSuffixSelector'

const withConjugation = (
  conjugation: string | SuffixOptions,
  { lastVowel, letters, value }: Word,
): Exception[] => {
  const suffix = typeof conjugation === 'string' ? conjugation : selectSuffix(value, conjugation)

  return [
    [/mű$/, (w) => w.replace(/mű$/, `műve${suffix}`)],
    [['tó', 'csónakázótó', 'halastó'], (w) => w.replace(/tó$/, `tava${suffix}`)],
    ['ló', (w) => w.replace('ló', `lova${suffix}`)],
    [/farok$/, (w) => w.replace(/farok$/, `farka${suffix}`)],
    [/teher$/, (w) => w.replace(/teher$/, `terhe${suffix}`)],
    [/(parázs|darázs)$/, (w) => w.replace(/rázs$/, `razsa${suffix}`)],
    [
      /(cukor|szeder|meder|retek|szatyor|eper|szitok|titok|átok|csokor|bokor|veder|vödör|étek|vétek|torok|árok|sarok|hurok|burok|marok|nyirok|cirok|szurok|szobor|kapocs|halom|bagoly|fogoly|félelem)$/,
      () =>
        letters
          .slice(0, -2)
          .map(({ value }) => value)
          .join('') +
        letters.slice(-1)[0].value +
        letters.slice(-2, -1)[0].value +
        suffix,
    ],
    [
      /(pohár|kenyér|madár|kanál|kosár|levél|agár|bogár|nyár|kerék|fenék)$/,
      (w) => w.slice(0, -2) + lastVowel.opposite + w.slice(-1) + lastVowel.opposite + suffix,
    ],
    [
      /(kő|tő|cső|nyű|fű|hó)$/,
      (w) =>
        w.slice(0, -1) +
        (lastVowel.value === 'ó' ? 'a' : lastVowel.opposite) +
        'v' +
        (lastVowel.isFrontVowel ? 'e' : 'a') +
        suffix,
    ],
    [
      /(kéz|réz|tűz|víz|út)$/,
      (w) =>
        w.slice(0, -2) +
        lastVowel.opposite +
        w.slice(-1) +
        (lastVowel.isFrontVowel ? 'e' : 'a') +
        suffix,
    ],
    [
      /(ház|vár|tej|hal|méz|láz|máz|váz|száz|tíz|igaz|őz|hely|toll|gally|gyors|váll|szakáll|arany|társ|egész|árny|föld)$/,
      (w) => w + (lastVowel.isFrontVowel ? 'e' : 'a') + conjugation,
    ],
    [/(kehely|pehely)$/, (w) => w.replace(/hely$/, `lyhe${conjugation}`)],
  ]
}

export const createGeneralExceptions =
  (conjugation: string | SuffixOptions) =>
  (word: Word): Exception[] =>
    withConjugation(conjugation, word)
