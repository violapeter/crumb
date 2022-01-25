import { VowelHarmony, VowelHeight, Word } from '@hungrammar/core'
import { Exception } from './exceptions'
import { createSuffixSelector } from './create'
import { assimilate } from './assimilation'

const ACCUSATIVE_CONJUGATION = 't'

export const ACCUSATIVE_EXCEPTIONS = ({ lastVowel, letters }: Word): Exception[] => [
  ['én', 'engem'],
  ['te', 'téged'],
  ['mi', 'minket'],
  ['ti', 'titeket'],
  [/farok$/, (w) => w.replace(/farok$/, 'farkat')],
  [/csimpánz$/, (w) => w.replace(/csimpánz$/, 'csimpánzt')],
  [/(parázs|darázs)$/, (w) => w.replace(/rázs$/, 'razsat')],
  [
    /(cukor|szeder|meder|retek|szatyor|eper|szitok|titok|átok|csokor|bokor|veder|vödör|étek|vétek|torok|árok|sarok|hurok|burok|marok|nyirok|cirok|szurok|szobor|kapocs|halom)$/,
    () =>
      letters
        .slice(0, -2)
        .map(({ value }) => value)
        .join('') +
      letters.slice(-1)[0].value +
      letters.slice(-2, -1)[0].value +
      ACCUSATIVE_CONJUGATION,
  ],
  [
    /(pohár|kenyér|madár|kanál|kosár|levél|agár|bogár|nyár|kerék|fenék)$/,
    (w) =>
      w.slice(0, -2) +
      lastVowel.opposite +
      w.slice(-1) +
      lastVowel.opposite +
      ACCUSATIVE_CONJUGATION,
  ],
  [
    /(kő|tő|cső|nyű|fű|tó|ló|hó|mű)$/,
    (w) =>
      w.slice(0, -1) +
      (lastVowel.value === 'ó' ? 'a' : lastVowel.opposite) +
      'v' +
      (lastVowel.isFrontVowel ? 'e' : 'a') +
      ACCUSATIVE_CONJUGATION,
  ],
  [
    /(kéz|réz|tűz|víz|út)$/,
    (w) =>
      w.slice(0, -2) +
      lastVowel.opposite +
      w.slice(-1) +
      (lastVowel.isFrontVowel ? 'e' : 'a') +
      ACCUSATIVE_CONJUGATION,
  ],
  [
    /(ház|vár|tej|hal|méz|láz|máz|váz|száz|tíz|igaz|őz|hely|toll|gally|gyors|váll|szakáll|arany|társ|egész|árny|föld)$/,
    (w) => w + (lastVowel.isFrontVowel ? 'e' : 'a') + ACCUSATIVE_CONJUGATION,
  ],
  [/.+(kehely|pehely)$/, (w) => w.replace(/hely$/, 'lyhet')],
]

const getForcedVowelHeight = (word: string): VowelHeight | undefined => {
  const { vowels, lastVowel, vowelHarmony } = new Word(word)

  if (vowels.length === 1) {
    if (lastVowel.isFrontVowel && lastVowel.value !== 'ő') {
      return VowelHeight.High
    }

    if (lastVowel.isBackVowel) {
      return VowelHeight.Low
    }
  }

  if (vowelHarmony === VowelHarmony.Mixed && lastVowel.value === 'é') {
    return VowelHeight.Low
  }

  return undefined
}

export const accusative = (word: string) => {
  const { lastLetter, endsWithConsonantCongestion } = new Word(word)

  if (lastLetter.isVowel) {
    if (/[ae]$/.test(lastLetter.value)) {
      return word.slice(0, -1) + lastLetter.opposite + ACCUSATIVE_CONJUGATION
    }

    return word + ACCUSATIVE_CONJUGATION
  }

  if (
    /([lnrsz]|ly|ny|sz|zs)$/.test(word) &&
    /^(.(?!cs$))+$/.test(word) &&
    !endsWithConsonantCongestion
  ) {
    return word + ACCUSATIVE_CONJUGATION
  }

  return createSuffixSelector({
    low: 'ot',
    high: 'et',
    highRounded: 'öt',
    forceHeight: getForcedVowelHeight(word),
  })(word)
}
