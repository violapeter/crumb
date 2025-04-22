import { grade } from '../index'

describe('gradation', () => {
  it('ends with vowel', () => {
    expect(grade.comparative('jó')).toBe('jobb')
    expect(grade.superlative('jó')).toBe('legjobb')
    expect(grade.excessive('jó')).toBe('legeslegjobb')
  })

  it('ends with consonant', () => {
    expect(grade.comparative('kevés')).toBe('kevesebb')
    expect(grade.superlative('kevés')).toBe('legkevesebb')
    expect(grade.excessive('kevés')).toBe('legeslegkevesebb')
  })

  const table = [
    ['abberált', 'abberáltabb'],
    ['bájos', 'bájosabb'],
    ['egészséges', 'egészségesebb'],
    ['dús', 'dúsabb'],
    ['fanyar', 'fanyarabb'],
    ['gátlástalan', 'gátlástalanabb'],
    ['gyenge', 'gyengébb'],
    ['gyáva', 'gyávább'],
    ['gyarló', 'gyarlóbb'],
    ['haragos', 'haragosabb'],
    ['jó', 'jobb'],
    ['sima', 'simább'],
    ['gyors', 'gyorsabb'],
    ['erős', 'erősebb'],
    ['vagány', 'vagányabb'],
    ['kopár', 'kopárabb'],
    ['epés', 'epésebb'],
    ['segítőkész', 'segítőkészebb'],
    ['bolond', 'bolondabb'],
    ['zord', 'zordabb'],
    ['kevés', 'kevesebb'],
    ['nehéz', 'nehezebb'],
  ]

  describe.each(table)('Comparative', (adjective, expected) => {
    it(adjective, () => {
      expect(grade.comparative(adjective)).toBe(expected)
    })
  })
})
