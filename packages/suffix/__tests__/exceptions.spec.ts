import {
  findFirstExceptionOfWord,
  matchesWord,
  mergeExceptionArrays,
  handleExceptions,
} from '../src/exceptions'

describe('matchesWord', () => {
  describe('when we only provide a string', () => {
    it('should be an exact match', () => {
      expect(matchesWord('kutya', 'kutya')).toBe(true)
      expect(matchesWord('kutya', 'mérési hiba')).toBe(false)
    })
  })
  describe('when we provide an array of strings', () => {
    it('should be found in the array', () => {
      expect(matchesWord('kutya', ['kutya', 'cica', 'mérési hiba'])).toBe(true)
      expect(matchesWord('kutya', ['cica', 'mérési hiba'])).toBe(false)
    })
  })
  describe('when we provide a regex', () => {
    it('it should match the regex', () => {
      expect(matchesWord('kutya', /^kutya$/)).toBe(true)
      expect(matchesWord('kutya', /^cic$/)).toBe(false)
    })
  })
  describe('when we provide an array of regex', () => {
    it('it should match the regex', () => {
      expect(matchesWord('kutya', [/^kutya$/, /cic/])).toBe(true)
      expect(matchesWord('kutya', [/^cic$/])).toBe(false)
    })
  })
})

describe('mergeExceptionArrays', () => {
  describe('when we provide multiple exception arrays', () => {
    it('should be in reversed order', () => {
      expect(mergeExceptionArrays([['hey', 'ho']], [['hi', 'ha']], [['foo', 'bar']])).toMatchObject(
        [
          ['foo', 'bar'],
          ['hi', 'ha'],
          ['hey', 'ho'],
        ],
      )
    })
  })
})

describe('findFirstException', () => {
  describe('when we provide multiple exceptions, and a word', () => {
    it('should return the last matched exception', () => {
      expect(
        findFirstExceptionOfWord(
          'kutya',
          [
            ['cica', 'mérési hiba'],
            ['hey', 'ho'],
            [/^kutya$/, 'ku'],
          ],
          [['kutya', 'kutya']],
        ),
      ).toMatchObject(['kutya', 'kutya'])
    })
  })
})

describe('handleExceptions', () => {
  describe('when there are matched exceptions', () => {
    it('should', () => {
      expect(
        handleExceptions(
          'kutya',
          [
            ['cica', 'mérési hiba'],
            ['hey', 'ho'],
            [/^kutya$/, 'ku'],
          ],
          [
            ['Jessica Alba', 'felrakom a falra'],
            ['kutya', 'kutya - exception'],
          ],
        ),
      ).toBe('kutya - exception')
    })
  })

  describe('when there are no exception or matched exception', () => {
    it('should return "false"', () => {
      expect(
        handleExceptions('kutya', [
          ['cica', 'mérési hiba'],
          ['hey', 'ho'],
          ['Jessica Alba', 'felrakom a falra'],
        ]),
      ).toBe(false)

      expect(handleExceptions('kutya', [])).toBe(false)
    })
  })

  describe('when there are a function provided as exception', () => {
    it('should call the callback', () => {
      expect(handleExceptions('kehely', [[/ely$/, (w) => w.replace(/hely$/, 'lyhet')]])).toBe(
        'kelyhet',
      )
    })
  })
})
