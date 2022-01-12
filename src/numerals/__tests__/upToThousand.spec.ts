import { upToThousand } from '../upToThousand'

describe('upToThousand', () => {
  it('one digit numbers', () => {
    expect(upToThousand('0')).toBe('')
    expect(upToThousand('1')).toBe('egy')
    expect(upToThousand('2')).toBe('két')
    expect(upToThousand('2', true)).toBe('kettő')
    expect(upToThousand('6')).toBe('hat')
  })

  it('two digit numbers', () => {
    expect(upToThousand('10')).toBe('tíz')
    expect(upToThousand('15')).toBe('tizenöt')
    expect(upToThousand('20')).toBe('húsz')
    expect(upToThousand('26')).toBe('huszonhat')
    expect(upToThousand('39')).toBe('harminckilenc')
    expect(upToThousand('67')).toBe('hatvanhét')
  })

  it('three digit numbers', () => {
    expect(upToThousand('100')).toBe('száz')
    expect(upToThousand('107')).toBe('százhét')
    expect(upToThousand('110')).toBe('száztíz')
    expect(upToThousand('118')).toBe('száztizennyolc')
    expect(upToThousand('120')).toBe('százhúsz')
    expect(upToThousand('127')).toBe('százhuszonhét')
    expect(upToThousand('200')).toBe('kétszáz')
    expect(upToThousand('220')).toBe('kétszázhúsz')
    expect(upToThousand('236')).toBe('kétszázharminchat')
    expect(upToThousand('867')).toBe('nyolcszázhatvanhét')
  })
})
