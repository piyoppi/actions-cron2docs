import { dictionary as ja } from './languages/ja'
import { dictionary as en } from './languages/en'
import * as github from '@actions/github'
import * as core from '@actions/core'
import { readFileSync, writeFileSync } from 'fs'
import { buildDocument } from './DocumentBuilder'

const dictionary = { ja }[core.getInput('language')] || en

const filename = core.getInput('cron_file')
const baseDir = core.getInput('base_dir')

const content = filename ? readFileSync(filename).toString() : core.getInput('cron_string')

if (!content) throw new Error('Crontab Content is not found.')

const doc = buildDocument(content, [],  dictionary, baseDir)

const outputFilename = core.getInput('output_filename')

if (outputFilename) {
  writeFileSync(outputFilename, doc)
}
