const fs = require('fs')
const path = require('path')
const readline = require('readline')

// Define the grammatical cases we want to extract
const CASES = {
  Nom: 'nominative',
  Acc: 'accusative',
  Dat: 'dative',
  Abl: 'ablative',
  Ade: 'adessive',
  All: 'allative',
  Del: 'delative',
  Ela: 'elative',
  Ill: 'illative',
  Ine: 'inessive',
  Subl: 'sublative',
  Supe: 'superessive',
  Ter: 'terminative',
  Tra: 'translative',
  Ins: 'instrumentalComitative',
  Loc: 'locative',
  Gen: 'genitive',
  // Additional cases
  Pl: 'plural',
  _Adjz: 'adjective',
  _Abe: 'privative',
  Temp: 'temporal',
  'EssFor:ként': 'essiveFormal',
  Ess: 'essiveModal',
  'Soc:stul': 'sociative',
  'Distr:nként': 'distributive',
  'Temp:nta': 'distributiveTemporal',
  'Form:képp': 'formal',
  'Mode:ul': 'modalEssive',
  'Multipl:szor': 'multiplicative',
  'Freq:gAt': 'frequentative',
  'Cau:ért': 'finalCasual'
}

// Map to store words and their cases, indexed by lemma
const lemmaMap = new Map()

// Map to keep track of which case forms we've already processed for each lemma
const processedCases = new Map()

async function processFile(filePath) {
  const fileStream = fs.createReadStream(filePath)

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  })

  // Skip the header line
  let isFirstLine = true

  for await (const line of rl) {
    if (isFirstLine) {
      isFirstLine = false
      continue
    }

    // Skip comment lines and empty lines
    if (line.startsWith('#') || line.trim() === '') {
      continue
    }

    const columns = line.split('\t')
    if (columns.length < 5) continue

    const form = columns[0]
    const anasStr = columns[2]
    const lemma = columns[3]
    const xpostag = columns[4]

    // Skip non-Hungarian words or words without proper analysis
    if (!lemma || !xpostag || anasStr === '[]') {
      continue
    }

    try {
      const anas = JSON.parse(anasStr)

      // Process each analysis
      for (const ana of anas) {
        if (!ana.tag) continue

        // Extract the case from the tag
        let foundCase = null
        for (const [caseTag, caseName] of Object.entries(CASES)) {
          // Handle cases with simple tags like [Nom], [Acc], etc.
          if (ana.tag.includes(`[${caseTag}]`)) {
            foundCase = caseName
            break
          }
          // Handle cases with complex tags like [EssFor:ként], [Soc:stul], etc.
          else if (caseTag.includes(':') && ana.tag.includes(`[${caseTag.split(':')[0]}:`)) {
            const tagParts = ana.tag.match(/\[[^\]]+\]/g) || [];
            for (const part of tagParts) {
              if (part.includes(`[${caseTag.split(':')[0]}:`)) {
                foundCase = caseName
                break
              }
            }
            if (foundCase) break
          }
        }

        // If this is a nominative form or another case we're interested in
        if (ana.lemma) {
          // Get or create the lemma object
          if (!lemmaMap.has(ana.lemma)) {
            lemmaMap.set(ana.lemma, {
              nominative: ana.lemma
            })
          }

          // Get the lemma object
          const lemmaObj = lemmaMap.get(ana.lemma)

          // Add the case if found, it's not a nominative form, and it doesn't have multiple suffixes
          if (foundCase && foundCase !== 'nominative') {
            // Check if the tag has only one case marker and no other suffixes (like plural, possessive, etc.)
            const tagParts = ana.tag.match(/\[[^\]]+\]/g) || [];

            // Allow tags with exactly two parts, where the first part starts with [/ and the second part is a case marker
            // Also allow tags with exactly two parts, where the first part starts with [/ and the second part is one of the new cases
            const hasOnlyOneCase = tagParts.length === 2 && 
                                  (tagParts[0].startsWith('[/') && 
                                   Object.entries(CASES).some(([caseTag, _]) => {
                                     if (caseTag.includes(':')) {
                                       return tagParts[1].includes(`[${caseTag.split(':')[0]}:`)
                                     } else {
                                       return tagParts[1].includes(`[${caseTag}]`)
                                     }
                                   }));


            if (hasOnlyOneCase) {
              // Check if we've already processed this case form for this lemma
              const caseKey = `${ana.lemma}:${foundCase}`
              if (!processedCases.has(caseKey)) {
                // Add this case to the existing lemma object
                lemmaObj[foundCase] = form
                processedCases.set(caseKey, true)
              }
            }
          }
        }
      }
    } catch (error) {
      // Skip entries with invalid JSON
      continue
    }
  }
}

// Function to get all TSV files in a directory
async function getTsvFiles(directoryPath) {
  const files = await fs.promises.readdir(directoryPath)
  return files.filter(file => file.endsWith('.tsv'))
}

async function main() {
  const sourceDir = path.join(__dirname, 'source')
  const outputFile = path.join(__dirname, 'hungarian-words.json')

  try {
    // Get all TSV files in the source directory
    const tsvFiles = await getTsvFiles(sourceDir)
    console.log(`Found ${tsvFiles.length} TSV files to process.`)

    // Process each TSV file
    for (const file of tsvFiles) {
      const inputFile = path.join(sourceDir, file)
      console.log(`Processing file: ${file}...`)
      await processFile(inputFile)
    }

    // Convert the lemmaMap to an array for the final result
    const result = Array.from(lemmaMap.values())

    // Filter out objects that only have the nominative case
    const filteredResult = result.filter(obj => Object.keys(obj).length > 1)

    // Write the result to a JSON file
    fs.writeFileSync(outputFile, JSON.stringify(filteredResult, null, 2), 'utf8')

    console.log(`Processed ${result.length} Hungarian word forms.`)
    console.log(`Filtered to ${filteredResult.length} forms with multiple cases.`)
    console.log(`Output saved to ${outputFile}`)
  } catch (error) {
    console.error('Error processing file:', error)
  }
}

main().catch(console.error)
