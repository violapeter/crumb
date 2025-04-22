import { suffix } from '../index'

describe('adessive', () => {
  it('shoud be good', () => {
    expect(suffix.adessive('ember')).toBe('embernél')
    expect(suffix.adessive('asszony')).toBe('asszonynál')
  })
})
