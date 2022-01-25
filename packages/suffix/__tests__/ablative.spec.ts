import { suffix } from '..'

describe('ablative case', () => {
  describe('simple cases', () => {
    it('should properly handle them', () => {
      expect(suffix.ablative('ember')).toBe('embertől')
      expect(suffix.ablative('kabát')).toBe('kabáttól')
      expect(suffix.ablative('kéz')).toBe('kéztől')
      expect(suffix.ablative('kenyérkereset')).toBe('kenyérkeresettől')
    })
    it('tier1', () => {
      expect(suffix.ablative('aki')).toBe('akitől')
      expect(suffix.ablative('valaki')).toBe('valakitől')
      expect(suffix.ablative('alaki')).toBe('alakitól')
      expect(suffix.ablative('laki')).toBe('lakitól')
    })
  })
})
