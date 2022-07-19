export enum Case {
  Upper,
  Lower,
}

export class Letter {
  public readonly value: string
  public readonly case: Case

  constructor(letter: string) {
    Letter.assertLetter(letter)

    this.case = Letter.isLowerCase(letter) ? Case.Lower : Case.Upper
    this.value = letter
  }

  get isVowel(): boolean {
    return /^([aáeéiíoóöőuúüű])$/i.test(this.value)
  }

  get isBackVowel(): boolean {
    return /^([aáuúoó])$/i.test(this.value)
  }

  get isFrontVowel(): boolean {
    return /^([eéiíüűöő])$/i.test(this.value)
  }

  get isRoundedVowel(): boolean {
    return /^([öőüű])$/i.test(this.value)
  }

  get isLongVowel(): boolean {
    return /^([áéíóőúű])$/i.test(this.value)
  }

  get isConsonant(): boolean {
    return /^([bcdfghjklmnpqrstvxzwy]|[cz]s|[glnt]y|[sd]z|dzs)$/i.test(this.value)
  }

  get opposite(): string {
    if (!this.isVowel) {
      throw new TypeError('You can call "Letter.opposite" only on vowels')
    }
    return Letter.diacriticsOpposite(this)
  }

  get isMultipleDigit(): boolean {
    return /^([cz]s|[glnt]y|[sd]z|dzs)$/i.test(this.value)
  }

  get longConsonant(): string {
    if (!this.isConsonant) {
      throw new TypeError('You can call "Letter.longConsonant" only on consonants')
    }

    const { value: v } = this

    if (v.length === 1) return v + v.toLowerCase()
    if (v.length === 2) return v[0] + v[0].toLowerCase() + v[1].toLowerCase()
    return v[0] + v[0].toLowerCase() + v[1].toLowerCase() + v[2].toLowerCase()
  }

  get upperCase() {
    return this.value.toUpperCase()
  }

  get lowerCase() {
    return this.value.toLowerCase()
  }

  is(str: string): boolean {
    return this.value === str
  }

  static diacriticsOpposite(vowel: string | Letter): string {
    const character = vowel instanceof Letter ? vowel.value : vowel
    const vowelPairs = 'aáeéiíoóöőuúüű'.split('')
    const index = vowelPairs.findIndex((curr) => curr === character)
    return vowelPairs[index + (index % 2 ? -1 : 1)]
  }

  static isLowerCase(letter: string): boolean {
    return letter === letter.toLowerCase() && letter !== letter.toUpperCase()
  }

  private static assertLetter(letter: string): void {
    const hunLetterRegex = /^([a-záéíóöőúüű]|[cz]s|[glnt]y|[sd]z|dzs)$/i

    if (!hunLetterRegex.test(letter)) {
      throw new TypeError(`Cannot use "${letter}" as Letter. Not a valid hungarian letter.`)
    }
  }
}
