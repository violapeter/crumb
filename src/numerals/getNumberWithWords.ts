import dict from './dictionary'

const getOneDigit = (number: number, alternate?: boolean): string => {
  const words = dict.oneDigit[number][1] as string
  if (Array.isArray(words)) {
    return alternate ? words[1] : words[0]
  }
  return words
}

const getPositiveNumberWithWords = (number: number): string => {
  if (number < 10) {
    return getOneDigit(number)
  }
  return ''
}

export const getNumberWithWords = (number: number): string =>
  `${number < 0 ? dict.whole : ''}${getPositiveNumberWithWords(Math.abs(number))}`
