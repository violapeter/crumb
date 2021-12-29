import { getNumberWithWords } from '../src/numerals/getNumberWithWords'

describe('number with words', () => {
  it('should handle "0" as a different case', () => {
    expect(getNumberWithWords(0)).toBe('nulla')
  })

  it('should write the simple cases properly', () => {
    expect(getNumberWithWords(1)).toBe('egy')
    expect(getNumberWithWords(100)).toBe('száz')
    expect(getNumberWithWords(15)).toBe('tizentöt')
  })
})
