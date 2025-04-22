export type StopWord = string | RegExp

const matchesStopWord = (word: string, stopWord: StopWord): boolean => {
  const isString = typeof stopWord === 'string'
  return (isString && word.startsWith(stopWord)) || (!isString && stopWord.test(word))
}

const findFirstMatchingStopWord = (word: string, stopWords: StopWord[]): StopWord | undefined =>
  stopWords.find((stopWord) => matchesStopWord(word, stopWord))

export const getStopWord = (string: string, stopWords: StopWord | StopWord[]): string | false => {
  const stopWordsArray = Array.isArray(stopWords) ? stopWords : [stopWords]
  const stopWord = findFirstMatchingStopWord(string, stopWordsArray)

  if (stopWord) {
    if (typeof stopWord === 'string') {
      return stopWord
    }

    const match = string.match(stopWord)

    if (!match) {
      return false
    }

    return match[0]
  }

  return false
}
