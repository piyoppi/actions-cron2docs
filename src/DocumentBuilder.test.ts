import { test, expect } from 'vitest'
import { existsSync } from 'fs'
import { build } from './DocumentBuilder'
import { dictionary as en } from './languages/en'

test('Should create an output markdown file', () => {
  build(
    {type: 'filename', content: process.cwd() + '/src/misc/tests/crontab.txt'},
    [process.cwd() + '/src/misc/tests/batches'],
    en,
    process.cwd() + '/src/misc/tests/tmp/out.md',
    process.cwd(),
    [{from: '/var/app/', to: process.cwd() + '/'}],
    ''
  )

  expect(existsSync('src/misc/tests/tmp/out.md')).toEqual(true)
})

test('Should throw an error when taskDir is not found', () => {
  expect(() => build(
    {type: 'filename', content: process.cwd() + '/src/misc/tests/crontab.txt'},
    ['path/to/invalid'],
    en,
    process.cwd() + '/src/misc/tests/tmp/out.md',
    process.cwd(),
    [{from: '/var/app/', to: process.cwd() + '/'}],
    ''
  )).toThrow('No shch directory "path/to/invalid"')
})
