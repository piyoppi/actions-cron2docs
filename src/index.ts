import { dictionary as ja } from './languages/ja'
import { dictionary as en } from './languages/en'
import * as core from '@actions/core'
import { build } from './DocumentBuilder'

const dictionary = { ja }[core.getInput('language')] || en

const filename = core.getInput('cron_file')
const baseDir = core.getInput('relative_path_base_dir') || null
const taskDirs = core.getInput('task_dirs')?.split(',').filter(dir => !!dir) || []
const outputFilename = core.getInput('output_filename') || null
const rewriteWhitelistPathFrom = core.getInput('rewrite_whitelist_path_from') || null
const rewriteWhitelistPathTo = core.getInput('rewrite_whitelist_path_to') || null

const content = {
  type: 'filename' as const,
  content: filename
}

const rewiteWhitelistPathes = rewriteWhitelistPathFrom && rewriteWhitelistPathTo ? [{
  from: rewriteWhitelistPathFrom,
  to: rewriteWhitelistPathTo
}] : []

build(content, taskDirs, dictionary, outputFilename, baseDir, rewiteWhitelistPathes)
