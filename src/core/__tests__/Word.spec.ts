import { VowelHarmony } from '../enums'
import { Letter } from '../Letter'
import { Word } from '../Word'

describe('Word class', () => {
  it('get word vowels', () => {
    const word = new Word('hello')

    expect(word.vowels).toEqual([new Letter('e'), new Letter('o')])
  })

  describe('word.vowelHarmony', () => {
    it('front', () => {
      const word = new Word('tok')
      expect(word.vowelHarmony).toBe(VowelHarmony.Back)
    })
  })

  describe('word.letters', () => {
    it('should takes into account the two digit letters', () => {
      const word = new Word('Pécs')
      expect(word.letters).toStrictEqual([
        new Letter('P'),
        new Letter('é'),
        new Letter('cs'),
      ])
    })

    it('should work with long consonants', () => {
      const word = new Word('dinnye')
      expect(word.letters).toStrictEqual([
        new Letter('d'),
        new Letter('i'),
        new Letter('ny'),
        new Letter('ny'),
        new Letter('e'),
      ])
    })

    it('should work when there are multiple two digit letters', () => {
      const word = new Word('nyunyóka')
      expect(word.letters).toStrictEqual([
        new Letter('ny'),
        new Letter('u'),
        new Letter('ny'),
        new Letter('ó'),
        new Letter('k'),
        new Letter('a'),
      ])
    })

    it('should work when there are multiple two digit letters', () => {
      const word = new Word('apacs')
      expect(word.letters).toStrictEqual([
        new Letter('a'),
        new Letter('p'),
        new Letter('a'),
        new Letter('cs'),
      ])
    })
  })
})
