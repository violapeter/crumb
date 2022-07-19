import { Exception } from '../utils/exceptions'
import { VowelHeight, Word } from '@crumb/core'

export const PRIVATIVE_EXCEPTIONS: Exception[] = [
  ['kár', 'kártalan'],
  ['lényeg', 'lényegtelen'],
]

export const privative = (word: string): string => {
  const w = new Word(word)
  const stem = /t$/.test(word) ? word.slice(0, -1) : word
  const bindingPhoneme = w.vowelHeight === VowelHeight.Low ? 'a' : 'e'
  const finalBindingPhoneme = w.lastVowel.isVowel ? '' : bindingPhoneme

  return `${stem}${finalBindingPhoneme}tl${bindingPhoneme}n`
}
