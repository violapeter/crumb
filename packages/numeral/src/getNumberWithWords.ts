import dict from './dictionary'

/**
 * Ezerig visszaad egy számot
 * magyar szavakkal
 */
export const upToThousand = (
  number: string,
  twoAsLast?: boolean,
  isFirstThousand?: boolean,
): string =>
  isFirstThousand
    ? ''
    : number
        .padStart(3, '0')
        .split('')
        .map((digit, index, arr) => {
          if (digit === '0') {
            return ''
          }
          if (index === 0) {
            if (digit === '1') return dict.hundred
            return dict.base[Number(digit)] + dict.hundred
          }
          if (index === 1) {
            if (arr[2] === '0') {
              if (digit === '1') return dict.ten
              if (digit === '2') return dict.twenty
            }
            return dict.twoDigitPrefix[Number(digit)]
          }
          return digit === '2' && twoAsLast ? dict.two : dict.base[Number(digit)]
        })
        .join('')

/**
 * Visszaad egy integert
 * magyar szavakkal
 */
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

/**
 * Visszaad egy pozitív
 * számot magyar szavakkal
 */
const getPositiveNumberWithWords = (number: number): string => {
  if (number > Number.MAX_SAFE_INTEGER || number < Number.MIN_SAFE_INTEGER) {
    throw new RangeError('You must provide a number that JavaScript can handle.')
  }

  const [integer, decimals] = number.toString().split('.')

  return (
    getIntegerPart(Number(integer)) +
    (decimals
      ? ` ${dict.whole} ${getIntegerPart(Number(decimals))} ${dict.decimals[decimals.length - 1]}`
      : '')
  )
}

/**
 * Visszaad egy számot magyar szavakkal
 */
export const getNumberWithWords = (number: number): string =>
  `${number < 0 ? `${dict.minus} ` : ''}${getPositiveNumberWithWords(Math.abs(number))}`
