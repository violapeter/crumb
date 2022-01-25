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
  const [suffixType, setSuffixType] = useState('accusative')
  const [input, setInput] = useState('')
  const [result, setResult] = useState<string[]>([])
  const [validWords, setValidWords] = useState<string[]>([])

  useEffect(() => {
    const rows = input.split('\n')
    const objects = rows.map((row) => {
      try {
        return suffix[suffixType](row)
      } catch (e) {}
    })
    setResult(objects)
  }, [suffixType, input])

  const handleCheckValid = (id) => {
    const index = validWords.findIndex((curr) => curr === id)
    setValidWords(index < 0 ? [...validWords, id] : validWords.filter((w, i) => i !== index))
  }

  return (
    <div>
      <textarea
        onChange={(e) => {
          setInput(e.target.value)
        }}
      />
      <select
        onChange={(e) => {
          setSuffixType(e.target.value)
        }}
      >
        {cases.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>
      <div>
        {result.map((resultRow, index) => (
          <div key={`${resultRow}-${index}`}>
            <input
              id={`${resultRow}-${index}`}
              type="checkbox"
              checked={validWords.includes(`${resultRow}-${index}`)}
              onChange={() => handleCheckValid(`${resultRow}-${index}`)}
            />
            <label
              style={{
                color: validWords.includes(`${resultRow}-${index}`) ? '#ddd' : 'black',
              }}
              htmlFor={`${resultRow}-${index}`}
            >
              {resultRow}
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
