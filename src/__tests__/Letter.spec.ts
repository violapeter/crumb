import Letter, { Case } from '../Letter'

describe('Letter class', () => {
  it('should throw TypeError, when string is longer than three character', () => {
    expect(() => new Letter('hello')).toThrow(TypeError)
  })

  it('a - isVowel should return true', () => {
    expect(new Letter('a').isVowel).toBe(true)
  })

  it('c - isVowel should return false', () => {
    expect(new Letter('c').isVowel).toBe(false)
  })

  it('a - isBackVowel should return true', () => {
    expect(new Letter('a').isBackVowel).toBe(true)
  })

  it('i - isBackVowel should return false', () => {
    expect(new Letter('i').isBackVowel).toBe(false)
  })

  it('i - isFrontVowel should return true', () => {
    expect(new Letter('i').isFrontVowel).toBe(true)
  })

  it('u - isFrontVowel should return false', () => {
    expect(new Letter('u').isFrontVowel).toBe(false)
  })

  it('ö - isRoundedVowel should return true', () => {
    expect(new Letter('ö').isRoundedVowel).toBe(true)
  })

  it('ú - isRoundedVowel should return false', () => {
    expect(new Letter('ú').isRoundedVowel).toBe(false)
  })

  it('t - isConsonant should return true', () => {
    expect(new Letter('t').isConsonant).toBe(true)
  })

  it('ty - should take multiple digit consonant into account', () => {
    expect(new Letter('ty').isConsonant).toBe(true)
  })

  it('dzs - should handle our beautiful three-digit letter', () => {
    expect(new Letter('dzs').isConsonant).toBe(true)
  })

  it('e - isConsonant should return false', () => {
    expect(new Letter('e').isConsonant).toBe(false)
  })

  it('ö - diacriticsOpposite', () => {
    expect(Letter.diacriticsOpposite('ö')).toBe('ő')
  })

  it('a - diacriticsOpposite', () => {
    expect(Letter.diacriticsOpposite('a')).toBe('á')
  })

  describe('cases', () => {
    it('Letter.isLowerCase', () => {
      expect(Letter.isLowerCase('D')).toBe(false)
    })

    it('isLowerCase', () => {
      expect(new Letter('E').case).toBe(Case.Upper)
    })

    it('lowerCase', () => {
      expect(new Letter('e').upperCase).toBe('E')
      expect(new Letter('E').upperCase).toBe('E')
    })

    it('upperCase', () => {
      expect(new Letter('C').lowerCase).toBe('c')
      expect(new Letter('c').lowerCase).toBe('c')
    })
  })

  describe('Long consonants', () => {
    it('should handle long consonants properly', () => {
      expect(new Letter('l').longConsonant).toBe('ll')
      expect(new Letter('ny').longConsonant).toBe('nny')
      expect(new Letter('cs').longConsonant).toBe('ccs')
      expect(new Letter('sz').longConsonant).toBe('ssz')
    })

    it('should handle casing as well', () => {
      expect(new Letter('Cs').longConsonant).toBe('Ccs')
    })
  })
})
