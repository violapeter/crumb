import { suffix } from '@hungrammar/suffix'
import { Word, VowelHarmony } from '@hungrammar/core'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'

const cases = [
  'accusative',
  'ablative',
  'adessive',
  'adjective',
  'allative',
  'finalCasual',
  'dative',
  'delative',
  'elative',
  'essiveFormal',
  'essiveModal',
  'illative',
  'insessive',
  'instrumentalComitative',
  'locative',
  'sublative',
  'superessive',
  'terminative',
  'translative',
]

const Home: NextPage = () => {
  const [c, setC] = useState('accusative')
  const [word, setWord] = useState('')
  const [result, setResult] = useState('')
  const [vowelHarmony, setVowelHarmony] = useState<VowelHarmony>(null)

  useEffect(() => {
    try {
      const w = new Word(word)
      setResult(suffix[c](word))
      setVowelHarmony(w.vowelHarmony)
    } catch (e) {
      console.log('no word')
    }
  }, [c, word])

  return (
    <div>
      <input
        type={'text'}
        onChange={(e) => {
          setWord(e.target.value)
        }}
      />
      <select
        onChange={(e) => {
          setC(e.target.value)
        }}
      >
        {cases.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>
      <div>{result}</div>
      <div>{vowelHarmony}</div>
    </div>
  )
}

export default Home
