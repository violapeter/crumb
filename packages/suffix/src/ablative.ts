import { createSuffixSelector } from './create'

export const ablative = (word: string) => {
  const shouldModifyLastLetter = /ae$/.test(word)

  return createSuffixSelector({
    low: 'tól',
    high: 'től',
  })(word)
}
