import Letter from './Letter'

export default class Word {
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

  /** Visszaadja egy szó magánhangzó-harmóniáját */
  get vowelHarmony(): VowelHarmony {
    const wordVowels = this.vowels

    if (wordVowels.length === 0) {
      return 'Front'
    }

    if (wordVowels.filter((vowel) => vowel.isBackVowel).length === 0) {
      return 'Front'
    }

    if (wordVowels.filter((vowel) => vowel.isFrontVowel).length === 0) {
      return 'Back'
    }

    return 'Mixed'
  }

  replace(regExp: RegExp, newString: string): Word {
    return new Word(this.value.replace(regExp, newString))
  }

  test(regExp: RegExp): boolean {
    return regExp.test(this.value)
  }
}
