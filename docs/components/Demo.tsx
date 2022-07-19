import { useEffect, useState } from 'react'
import { suffix } from '@crumb/suffix'
import { getNumberWithWords } from '@crumb/numeral'
import { getSyllables } from '@crumb/syllable'

export const Demo = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState('suffix')
  const [input, setInput] = useState('')
  const [result, setResult] = useState<{ type: string; value: string }[]>([])
  const [numberResult, setNumberResult] = useState<string>(null)
  const [syllablesResult, setSyllablesResult] = useState<string[]>([])

  useEffect(() => {
    const cases = Object.keys(suffix)

    try {
      setResult(
        cases.map((c) => ({
          type: c,
          value: suffix[c](input),
        })),
      )
    } catch (e) {}
  }, [input, setResult])

  const handleKeyUp = ({ key, target }) => {
    if (key === 'Escape') {
      target.value = ''
      setInput('')
      setResult([])
    }
  }

  const handleChange = ({ target }) => {
    if (target.value === '') {
      setResult([])
      return
    }

    setInput(target.value)
  }

  const handleChangeNumber = ({ target }) => {
    if (target.checkValidity()) {
      setNumberResult(getNumberWithWords(target.value))
    }
  }

  const handleChangeSyllables = ({ target }) => {
    if (target.checkValidity()) {
      setSyllablesResult(getSyllables(target.value))
    }
  }

  return (
    <div className="demo">
      <div className="tablist">
        <div
          className={`tab ${activeTab === 'suffix' && 'active'}`}
          onClick={() => setActiveTab('suffix')}
        >
          Toldalékolás
        </div>
        <div
          className={`tab ${activeTab === 'numerals' && 'active'}`}
          onClick={() => setActiveTab('numerals')}
        >
          Számok
        </div>
        <div
          className={`tab ${activeTab === 'syllables' && 'active'}`}
          onClick={() => setActiveTab('syllables')}
        >
          Szótagolás
        </div>
      </div>

      <div className="inputs nextra-search">
        {activeTab === 'suffix' && (
          <div className="tabpanel">
            <input
              className="input appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:ring"
              placeholder="Írj ide egy tőszót"
              type="text"
              onKeyUp={handleKeyUp}
              onChange={handleChange}
            />
            {result.length !== 0 && (
              <div className="results">
                {result.map((c) => (
                  <div className="case" key={c.type}>
                    <div className="type">{c.type}</div>
                    <div className="value">{c.value}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {activeTab === 'numerals' && (
          <div className="tabpanel">
            <input
              className="input appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:ring"
              placeholder="Írj ide egy számot"
              type="number"
              onKeyUp={handleKeyUp}
              onChange={handleChangeNumber}
              max={Number.MAX_SAFE_INTEGER}
              min={Number.MIN_SAFE_INTEGER}
            />
            <div className="results">{numberResult && numberResult}</div>
          </div>
        )}
        {activeTab === 'syllables' && (
          <div className="tabpanel">
            <input
              className="input appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:ring"
              placeholder="Írj be egy szót"
              type="text"
              onKeyUp={handleKeyUp}
              onChange={handleChangeSyllables}
            />
            <div className="results">{syllablesResult && syllablesResult.join('-')}</div>
          </div>
        )}
      </div>
    </div>
  )
}
