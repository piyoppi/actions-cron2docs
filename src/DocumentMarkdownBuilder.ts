import {
  DailyTimelineTableBuilder, 
  MonthlyTimelineTableBuilder,
  YearlyTimelineTableBuilder,
  JobListTableBuilder
} from '@piyoppi/cron2json-docs-display-table'
import { cron2doc } from '@piyoppi/cron2json-docs-generator'
import { Dictionary } from './languages/Dictionary'
import { CommentGenerator } from '@piyoppi/cron2json-comment-generator'

export const buildDocumentMarkdown = (content: string, commentGenerators: CommentGenerator[], dictionary: Dictionary) => {
  const docs = cron2doc(content, commentGenerators)
  
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
      const summary = props.doc.comment.summary ? `\n\`\`\`\n${props.doc.comment.summary}\n\`\`\`\n` :
        props.doc.comment.raw ? `\n\`\`\`\n${props.doc.comment.raw}\n\`\`\`\n` : ''
      return acc + `
## ${props.doc.schedule.command}
${title}${summary}
${props.table}
`}, '')

  return timelineDoc + jobListDoc
}
