import dict from './dictionary'
import { upToThousand } from './upToThousand'

const getIntegerPart = (integer: number): string =>
  integer === 0
    ? dict.base[0]
    : integer
        .toString()
        .split(/\B(?=(?:\d{3})+(?!\d))/g)
        .reverse()
        .map((group, index) =>
          group === '000'
            ? ''
            : upToThousand(group, index === 0, integer === 1000) + dict.powerOfTen[index],
        )
        .reverse()
        .filter(Boolean)
        .join(Number(integer) > 2000 || Number(integer) % 1000 !== 0 ? '-' : '')

const getPositiveNumberWithWords = (number: number): string => {
  if (number > Number.MAX_SAFE_INTEGER || number < Number.MIN_SAFE_INTEGER) {
    throw new Error('You must provide a number that JavaScript can handle.')
  }

  const [integer, decimals] = number.toString().split('.')

  return (
    getIntegerPart(Number(integer)) +
    (decimals
      ? ` ${dict.whole} ${getIntegerPart(Number(decimals))} ${dict.decimals[decimals.length - 1]}`
      : '')
  )
}

export const getNumberWithWords = (number: number): string =>
  `${number < 0 ? `${dict.minus} ` : ''}${getPositiveNumberWithWords(Math.abs(number))}`
