import { VowelHeight, Word } from '@crumb/core'
import { Exception } from '../utils/exceptions'
import { createGeneralExceptions } from '../utils/createGeneralExceptions'
import { createSuffixer } from '../utils/createSuffixer'
import { assimilate } from '../utils/assimilation'

export const GENITIVE_EXCEPTIONS: Exception[] = [
  ['affér', 'afférja'],
  ['bagoly', 'baglya'],
  ['bér', 'bére'],
  ['szén', 'szene'],
  ['kürt', 'kürtje'],
  ['vő', 'veje'],
  ['velő', 'veleje'],
]

export const genitive = (word: string): string => {
  const w = new Word(word)

  const suffixerMethod = (word: string): string => {
    const endsWithVowel = w.lastLetter.isVowel
    const bindingPhoneme = endsWithVowel ? 'j' : ''
    const endPhoneme = w.vowelHeight === VowelHeight.Low ? 'a' : 'e'
    const endsWithR = w.lastLetter.is('r')
    const endsWithN = w.lastLetter.is('n')
    const oneSyllable = w.vowels.length === 1

    if ((oneSyllable && endsWithR) || endsWithN) {
      return word + 'j' + endPhoneme
    }

    if (endsWithVowel || (oneSyllable && endsWithR)) {
      return assimilate(word, bindingPhoneme + endPhoneme)
    }

    return word + endPhoneme
  }

  return createSuffixer(suffixerMethod, createGeneralExceptions('')(w))(word, GENITIVE_EXCEPTIONS)
}
