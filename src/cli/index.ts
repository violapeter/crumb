#!/usr/bin/env node

const { Command } = require('commander')
const { Word } = require('../core/Word')
const { getSyllables } = require('../syllable/getSyllables')
const { suffix, grade } = require('../suffix')
const { getNumberWithWords } = require('../numeral/getNumberWithWords')
const { VowelHarmony, VowelHeight } = require('../core/enums')

const color = {
  green: (text: string) => `\x1b[32m${text}\x1b[0m`,
  red: (text: string) => `\x1b[31m${text}\x1b[0m`,
  bold: (text: string) => `\x1b[1m${text}\x1b[0m`,
}

const program = new Command()

program
  .name('crumb')
  .description('CLI for Crumb.js - Magyar morfológiai generátor')
  .version('1.0.0')

program
  .command('analyze')
  .description('Elemez egy magyar tőszót')
  .argument('<word>', 'Magyar szó')
  .action((word: string) => {
    try {
      const w = new Word(word)
      console.log(color.bold('Elemzés:'))
      console.log(color.green('Eredeti szó:'), w.value)
      console.log(
        color.green('Hangrend:'),
        w.vowelHeight === VowelHeight.High ? 'magas' : 'alacsony',
      )
      console.log(
        color.green('Mássalhangzó-torlódással végződik?'),
        w.endsWithConsonantCongestion ? 'igen' : 'nem',
      )
      console.log(
        color.green('Magánhangzó-harmónia:'),
        w.vowelHarmony === VowelHarmony.Back ? 'veláris' : 'palatális',
      )
      console.log(color.green('Betűk száma:'), w.letters.length)
      console.log(color.green('Utolsó magánhangzó:'), w.lastVowel.value)
      console.log(color.green('Szótagolva:'), getSyllables(word))
    } catch (error: any) {
      console.error(color.red('Hiba:'), error.message)
    }
  })

const gradeCommand = program
  .command('grade')
  .description('Visszaadja egy melléknév fokozását')

Object.entries(grade).forEach(
  ([gradeType, gradeMethod]: [
    keyof typeof grade,
    (typeof grade)[keyof typeof grade],
  ]) => {
    gradeCommand
      .command(gradeType)
      .argument('<word>', 'Melléknév')
      .action((word: string) => {
        try {
          console.log(gradeMethod(word))
        } catch (error: any) {
          console.error(color.red('Hiba:'), error.message)
        }
      })
  },
)

const suffixCommand = program
  .command('suffix')
  .description(`Toldalékol egy magyar tőszót`)

Object.entries(suffix).forEach(
  ([suffixType, suffixMethod]: [
    keyof typeof suffix,
    (typeof suffix)[keyof typeof grade],
  ]) => {
    suffixCommand
      .command(suffixType)
      .description(
        `Toldalékol egy magyar tőszót az ${suffixType as string} toldalékkal`,
      )
      .argument('<word>', 'A tőszó')
      .action((word: string) => {
        try {
          console.log(suffixMethod(word))
        } catch (error: any) {
          console.error(color.red('Hiba:'), error.message)
        }
      })
  },
)

// Numeral command
program
  .command('numeral')
  .description('Convert a number to its Hungarian word form')
  .argument('<number>', 'The number to convert')
  .action((number: string) => {
    try {
      const num = parseFloat(number)
      console.log(getNumberWithWords(num))
    } catch (error: any) {
      console.error(color.red('Error converting numeral:'), error.message)
    }
  })

// Syllable command
program
  .command('syllable')
  .description('Split a Hungarian word into syllables')
  .argument('<word>', 'The word to syllabify')
  .action((word: string) => {
    try {
      const syllables = getSyllables(word, { formatted: true })
      console.log(syllables)
    } catch (error: any) {
      console.error(color.red('Error syllabifying word:'), error.message)
    }
  })

// Parse command line arguments
program.parse(process.argv)

// If no arguments provided, show help
if (!process.argv.slice(2).length) {
  program.outputHelp()
}
