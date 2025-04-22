import { suffix } from '../index'
import { SuffixerMethod } from '../utils/createSuffixer'

const testData: Array<[string, string, string, SuffixerMethod]> = [
  ['accusative', 'kalapács', 'kalapácsot', suffix.accusative],
  ['accusative', 'bagoly', 'baglyot', suffix.accusative],
  ['ablative', 'kalapács', 'kalapácstól', suffix.ablative],
  ['adessive', 'kalapács', 'kalapácsnál', suffix.adessive],
  ['adjective', 'kalapács', 'kalapácsi', suffix.adjective],
  ['allative', 'kalapács', 'kalapácshoz', suffix.allative],
  ['finalCasual', 'kalapács', 'kalapácsért', suffix.finalCasual],
  ['dative', 'kalapács', 'kalapácsnak', suffix.dative],
  ['delative', 'kalapács', 'kalapácsról', suffix.delative],
  ['elative', 'kalapács', 'kalapácsból', suffix.elative],
  ['essiveFormal', 'kalapács', 'kalapácsként', suffix.essiveFormal],
  ['essiveModal', 'kalapács', 'kalapácsul', suffix.essiveModal],
  ['illative', 'kalapács', 'kalapácsba', suffix.illative],
  ['insessive', 'kalapács', 'kalapácsban', suffix.insessive],
  [
    'instrumentalComitative',
    'kalapács',
    'kalapáccsal',
    suffix.instrumentalComitative,
  ],
  ['locative', 'Pécs', 'Pécsett', suffix.locative],
  ['sublative', 'kalapács', 'kalapácsra', suffix.sublative],
  ['superessive', 'kalapács', 'kalapácson', suffix.superessive],
  ['terminative', 'kalapács', 'kalapácsig', suffix.terminative],
  ['translative', 'kalapács', 'kalapáccsá', suffix.translative],
  ['privative', 'eszmélet', 'eszméletlen', suffix.privative],
  ['plural', 'kalapács', 'kalapácsok', suffix.plural],
  ['plural', 'völgy', 'völgyek', suffix.plural],
  ['genitive', 'kalapács', 'kalapácsa', suffix.genitive],
  ['temporal', 'óra', 'órakor', suffix.temporal],
  // ['sociative', 'kalapács', 'kalapácsostul', suffix.sociative],
  ['distributiveTemporal', 'nap', 'naponta', suffix.distributiveTemporal],
  ['distributive', 'reggel', 'reggelenként', suffix.distributive],
  ['formal', 'sokféle', 'sokféleképpen', suffix.formal],
  ['modalEssive', 'rab', 'rabul', suffix.modalEssive],
  ['multiplicative', 'nyolc', 'nyolcszor', suffix.multiplicative],
  // ['frequentative', 'eszik', 'eszeget', suffix.frequentative],
]

describe.each(testData)('.%s(%s)', (name, baseWord, expected, suffixer) => {
  test(`returns ${expected}`, () => {
    expect(suffixer(baseWord)).toBe(expected)
  })
})
