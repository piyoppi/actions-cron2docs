import { test, expect } from 'vitest'
import { buildDocumentMarkdown } from './DocumentMarkdownBuilder'
import { dictionary as en } from './languages/en'

test('Should return the markdown text', () => {
  const crontab = `
    MAILTO=test@example.com

    00 * * * * misc/hourly.sh -v
    00 */3 * * * misc/every-3-hours.sh -v
    00 01 * * * /usr/bin/midnight-batch-1.sh -m 1
    00 03 * * * /usr/bin/midnight-batch-3.sh -m 1
    0 0 1 * * /usr/bin/beginning-of-month.sh -m 1
    0 0 28-31 * * /usr/bin/end-of-month.sh -m 1
    0 0 1 1 * /usr/bin/happy-new-year.sh
  `

  expect(buildDocumentMarkdown(crontab, [], en)).toEqual(`
# Daily jobs

| Time | Command | Title |
| --- | --- | --- |
| 00:00:00 | misc/hourly.sh -v |  |
| 00:00:00 | misc/every-3-hours.sh -v |  |
| 01:00:00 | misc/hourly.sh -v |  |
| 01:00:00 | /usr/bin/midnight-batch-1.sh -m 1 |  |
| 02:00:00 | misc/hourly.sh -v |  |
| 03:00:00 | misc/hourly.sh -v |  |
| 03:00:00 | misc/every-3-hours.sh -v |  |
| 03:00:00 | /usr/bin/midnight-batch-3.sh -m 1 |  |
| 04:00:00 | misc/hourly.sh -v |  |
| 05:00:00 | misc/hourly.sh -v |  |
| 06:00:00 | misc/hourly.sh -v |  |
| 06:00:00 | misc/every-3-hours.sh -v |  |
| 07:00:00 | misc/hourly.sh -v |  |
| 08:00:00 | misc/hourly.sh -v |  |
| 09:00:00 | misc/hourly.sh -v |  |
| 09:00:00 | misc/every-3-hours.sh -v |  |
| 10:00:00 | misc/hourly.sh -v |  |
| 11:00:00 | misc/hourly.sh -v |  |
| 12:00:00 | misc/hourly.sh -v |  |
| 12:00:00 | misc/every-3-hours.sh -v |  |
| 13:00:00 | misc/hourly.sh -v |  |
| 14:00:00 | misc/hourly.sh -v |  |
| 15:00:00 | misc/hourly.sh -v |  |
| 15:00:00 | misc/every-3-hours.sh -v |  |
| 16:00:00 | misc/hourly.sh -v |  |
| 17:00:00 | misc/hourly.sh -v |  |
| 18:00:00 | misc/hourly.sh -v |  |
| 18:00:00 | misc/every-3-hours.sh -v |  |
| 19:00:00 | misc/hourly.sh -v |  |
| 20:00:00 | misc/hourly.sh -v |  |
| 21:00:00 | misc/hourly.sh -v |  |
| 21:00:00 | misc/every-3-hours.sh -v |  |
| 22:00:00 | misc/hourly.sh -v |  |
| 23:00:00 | misc/hourly.sh -v |  |

# Monthly jobs

| Day | Time | Command | Title |
| --- | --- | --- | --- |
| 1 | 00:00:00 | /usr/bin/beginning-of-month.sh -m 1 |  |
| 28 | 00:00:00 | /usr/bin/end-of-month.sh -m 1 |  |
| 29 | 00:00:00 | /usr/bin/end-of-month.sh -m 1 |  |
| 30 | 00:00:00 | /usr/bin/end-of-month.sh -m 1 |  |
| 31 | 00:00:00 | /usr/bin/end-of-month.sh -m 1 |  |

# Other jobs

| Month | Day | Time | Command | Title |
| --- | --- | --- | --- | --- |
| 1 | 1 | 00:00:00 | /usr/bin/happy-new-year.sh |  |

# Job list

## misc/hourly.sh -v

| Command | misc/hourly.sh -v |
| --- | --- |
| Month | 1,2,3,4,5,6,7,8,9,10,11,12 |
| Day | 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31 |
| Time | 00:00:00,01:00:00,02:00:00,03:00:00,04:00:00,05:00:00,06:00:00,07:00:00,08:00:00,09:00:00,10:00:00,11:00:00,12:00:00,13:00:00,14:00:00,15:00:00,16:00:00,17:00:00,18:00:00,19:00:00,20:00:00,21:00:00,22:00:00,23:00:00 |

## misc/every-3-hours.sh -v

| Command | misc/every-3-hours.sh -v |
| --- | --- |
| Month | 1,2,3,4,5,6,7,8,9,10,11,12 |
| Day | 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31 |
| Time | 00:00:00,03:00:00,06:00:00,09:00:00,12:00:00,15:00:00,18:00:00,21:00:00 |

## /usr/bin/midnight-batch-1.sh -m 1

| Command | /usr/bin/midnight-batch-1.sh -m 1 |
| --- | --- |
| Month | 1,2,3,4,5,6,7,8,9,10,11,12 |
| Day | 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31 |
| Time | 01:00:00 |

## /usr/bin/midnight-batch-3.sh -m 1

| Command | /usr/bin/midnight-batch-3.sh -m 1 |
| --- | --- |
| Month | 1,2,3,4,5,6,7,8,9,10,11,12 |
| Day | 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31 |
| Time | 03:00:00 |

## /usr/bin/beginning-of-month.sh -m 1

| Command | /usr/bin/beginning-of-month.sh -m 1 |
| --- | --- |
| Month | 1,2,3,4,5,6,7,8,9,10,11,12 |
| Day | 1 |
| Time | 00:00:00 |

## /usr/bin/end-of-month.sh -m 1

| Command | /usr/bin/end-of-month.sh -m 1 |
| --- | --- |
| Month | 1,2,3,4,5,6,7,8,9,10,11,12 |
| Day | 28,29,30,31 |
| Time | 00:00:00 |

## /usr/bin/happy-new-year.sh

| Command | /usr/bin/happy-new-year.sh |
| --- | --- |
| Month | 1 |
| Day | 1 |
| Time | 00:00:00 |
`)
})
