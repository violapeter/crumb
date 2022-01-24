import { VowelHarmony, VowelHeight } from './enums'
import { Letter } from '..'

export class Word {
  /** Egy kifejezésben lehetséges szeparátor karakterek */
  static PHRASES_SEPARATOR = /–|-|,\s|\s/gi

  private raw: string

  value: string

  letters: Array<Letter>

  constructor(word: string) {
    Word.assertWord(word)

    this.raw = word
    this.value = word
    this.letters = this.createLetters()
  }

  private createLetters(): Array<Letter> {
    const hungarianLettersRegex = /[cz]s|[glnt]y|[sd]z|dzs|[a-záéíóöőúüű]/gi
    const letters = this.raw.match(hungarianLettersRegex)

    return letters
      ? letters.map((letter, index, array) => {
          if (index < array.length - 1) {
            const nextLetter = array[index + 1]
            if (nextLetter.match(/[glnt]y|[cz]s|[sd]z/) && letter === nextLetter.split('')[0]) {
              return new Letter(nextLetter)
            }
          }
          return new Letter(letter)
        })
      : []
  }

  private static assertWord(word: string): void {
    if (Word.PHRASES_SEPARATOR.test(word)) {
      throw new Error('The word cannot contain " ", "," and "-"')
    }
  }

  get capitalized(): string {
    return this.value.charAt(0).toUpperCase() + this.value.slice(1)
  }

  get lowerCase(): string {
    return this.value.toLowerCase()
  }

  get lastLetter(): Letter {
    return this.letters[this.letters.length - 1]
  }

  get vowels(): Array<Letter> {
    return this.letters.filter((letter) => letter.isVowel)
  }

  get lastVowel(): Letter {
    if (!this.vowels.length) {
      return new Letter('')
    }
    return this.vowels[this.vowels.length - 1]
  }

  get endsWithConsonantCongestion(): boolean {
    if (this.letters.length < 2) return false
    const beforeLastLetter = this.letters[this.letters.length - 2]
    return this.lastLetter.isConsonant && beforeLastLetter.isConsonant
  }

  /** Visszaadja egy szó magánhangzó-harmóniáját */
  get vowelHarmony(): VowelHarmony {
    const wordVowels = this.vowels

    if (wordVowels.length === 0) {
      return VowelHarmony.Front
    }

    if (wordVowels.filter((vowel) => vowel.isBackVowel).length === 0) {
      return VowelHarmony.Front
    }

    if (wordVowels.filter((vowel) => vowel.isFrontVowel).length === 0) {
      return VowelHarmony.Back
    }

    return VowelHarmony.Mixed
  }

  get vowelHeight(): VowelHeight {
    if (this.lastVowel.isRoundedVowel) {
      return VowelHeight.HighRounded
    }

    if (this.vowelHarmony === VowelHarmony.Back) {
      return VowelHeight.Low
    }

    if (this.vowelHarmony === VowelHarmony.Front) {
      return VowelHeight.High
    }

    if (this.vowelHarmony === VowelHarmony.Mixed) {
      const lastTwoVowels = this.vowels.slice(-2)

      if (/[eé]/.test(this.lastVowel.value) || lastTwoVowels.every((vowel) => vowel.isFrontVowel)) {
        return VowelHeight.High
      }

      return VowelHeight.Low
    }

    return VowelHeight.Low
  }

  replace(regExp: RegExp, newString: string): Word {
    return new Word(this.value.replace(regExp, newString))
  }

  test(regExp: RegExp): boolean {
    return regExp.test(this.value)
  }
}
