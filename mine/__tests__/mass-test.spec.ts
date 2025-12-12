import { suffix } from '../../src/suffix'
import corpus from '../hungarian-words.json'

type CorpusItem = Record<keyof typeof suffix, string>

describe('Mass test', () => {
  it.skip('should', () => {
    ;(corpus as Array<CorpusItem>).forEach((item) => {
      Object.entries(item).forEach(([key, value]) => {
        expect(suffix[key as keyof typeof suffix](item.nominative!)).toBe(value)
      })
    })
  })
})
