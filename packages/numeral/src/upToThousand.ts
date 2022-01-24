import dict from './dictionary'

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
