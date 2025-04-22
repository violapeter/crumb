import { Exception } from '../utils/exceptions'

export const adjective = (word: string) => (word.slice(-1) === 'i' ? word : `${word}i`)

export const ADJECTIVE_EXCEPTIONS: Exception[] = [
  ['Eger', 'egri'],
  [/halom$/, (w) => w.replace(/halom$/, 'halmi')],
]
