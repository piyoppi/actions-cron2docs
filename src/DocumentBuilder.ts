import { buildDocumentMarkdown } from './DocumentMarkdownBuilder'
import { FileCommentGenerator } from '@piyoppi/cron2json-comment-generator-file'
import { Cron2JsonSimpleFilenameExtractor } from '@piyoppi/cron2json-filename-extractor-simple'
import { PhpCommentExtractor } from '@piyoppi/cron2json-comment-extractor-php'
import { ShellScriptCommentExtractor } from '@piyoppi/cron2json-comment-extractor-shellscript'
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs'
import { join as pathJoin } from 'path'
import { Dictionary } from './languages/Dictionary'
import { YamlCommentGenerator } from '@piyoppi/cron2json-comment-generator-yaml'

type DocumentBuilderContent = {
  type: 'filename' | 'text',
  content: string
}

type WhitelistRewriteConfig = {
  from: string,
  to: string
}

export const build = (
  content: DocumentBuilderContent,
  taskDirs: string[],
  dictionary: Dictionary,
  outputFilename: string | null,
  relativePathBaseDir: string | null,
  overridePathes: WhitelistRewriteConfig[],
  documentYamlFilename: string | null,
) => {

  taskDirs.forEach(dir => {
    if (!existsSync(dir)) throw new Error(`No shch directory "${dir}"`)
  })

  const taskFiles = taskDirs
    .map(dir => readdirSync(dir).map(fn => pathJoin(dir, fn)))
    .flat()

  const commentGenerators = []

  if (documentYamlFilename && existsSync(documentYamlFilename)) {
    commentGenerators.push(new YamlCommentGenerator(readFileSync(documentYamlFilename).toString()))
  }

  commentGenerators.push(
    new FileCommentGenerator(
      [
        new Cron2JsonSimpleFilenameExtractor(taskFiles, {baseDir: relativePathBaseDir, overridePathes})
      ],
      [
        new PhpCommentExtractor(['.php']),
        new ShellScriptCommentExtractor(['.sh'])
      ]
    )
  )

  const crontabText = content.type === 'filename' ? readFileSync(content.content).toString() : content.content

  if (!content) throw new Error('Crontab Content is not found.')

  const doc = buildDocumentMarkdown(crontabText, commentGenerators,  dictionary)

  if (outputFilename) {
    writeFileSync(outputFilename, doc)
  }
}
