import { getSyllables } from '../getSyllables'

describe('getSyllables', () => {
  describe('when the word contains only one vowel', () => {
    it('should be only one syllable', () => {
      expect(getSyllables('Pest')).toEqual(['Pest'])
      expect(getSyllables('zeng')).toEqual(['zeng'])
      expect(getSyllables('nyolc')).toEqual(['nyolc'])
      expect(getSyllables('strand')).toEqual(['strand'])
      expect(getSyllables('sztrájk')).toEqual(['sztrájk'])
    })
  })

  describe('when there are more vowels', () => {
    it('should work according the rules of hungarian separation', () => {
      expect(getSyllables('termés')).toEqual(['ter', 'més'])
      expect(getSyllables('kerengő')).toEqual(['ke', 'ren', 'gő'])
      expect(getSyllables('valahol')).toEqual(['va', 'la', 'hol'])
      expect(getSyllables('diónyi')).toEqual(['di', 'ó', 'nyi'])
      expect(getSyllables('euró')).toEqual(['e', 'u', 'ró'])
      expect(getSyllables('gumpfszli')).toEqual(['gumpfsz', 'li'])
      expect(getSyllables('megint')).toEqual(['me', 'gint'])
      expect(getSyllables('manccsá')).toEqual(['mancs', 'csá'])
    })
  })
})
