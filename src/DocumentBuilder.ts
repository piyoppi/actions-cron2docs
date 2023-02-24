import {
  DailyTimelineTableBuilder, 
  MonthlyTimelineTableBuilder,
  YearlyTimelineTableBuilder,
  JobListTableBuilder
} from '@piyoppi/cron2json-docs-display-table'
import { cron2doc } from '@piyoppi/cron2json-docs-generator'
import { Dictionary } from './languages/Dictionary'
import { CommentExtractor } from '@piyoppi/cron2json-comment-extractor'

export const buildDocument = (content: string, commentExtractor: CommentExtractor[], dictionary: Dictionary, baseDir: string | null = null) => {
  const docs = cron2doc(content, commentExtractor, baseDir)
  
  const timelineDoc = [
    {builder: new DailyTimelineTableBuilder(dictionary.dailyTimelineTable), title: dictionary.dailyTimelineTableTitle},
    {builder: new MonthlyTimelineTableBuilder(dictionary.monthlyTimelineTable), title: dictionary.monthlyTimelineTableTitle},
    {builder: new YearlyTimelineTableBuilder(dictionary.yearlyTimelineTable), title: dictionary.yearlyTimelineTableTitle}
  ].map(props => ({...props, table: props.builder.build(docs)}))
    .reduce((acc, props) => acc + `
# ${props.title}

${props.table}
`, '')

  
  const jobListBuilder = new JobListTableBuilder(dictionary.jobListTable)
  
  const jobListDoc = `\n# ${dictionary.jobListTableTitle}\n` + docs.map(doc => ({doc, table: jobListBuilder.build(doc)}))
    .reduce((acc, props) => {
      const title = props.doc.comment.title ? `\n${props.doc.comment.title}\n` : ''
      return acc + `
## ${props.doc.schedule.command}
${title}
${props.table}
`}, '')

  return timelineDoc + jobListDoc
}
