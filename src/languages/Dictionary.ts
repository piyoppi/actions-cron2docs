import {
  DailyTimelineTableBuilderDictionary,
  MonthlyTimelineTableBuilderDictionary,
  YearlyTimelineTableBuilderDictionary,
  JobListTableDictionary
} from "@piyoppi/cron2json-docs-display-table"

export type Dictionary = {
  dailyTimelineTable: DailyTimelineTableBuilderDictionary,
  dailyTimelineTableTitle: string,
  monthlyTimelineTable: MonthlyTimelineTableBuilderDictionary,
  monthlyTimelineTableTitle: string,
  yearlyTimelineTable: YearlyTimelineTableBuilderDictionary,
  yearlyTimelineTableTitle: string,
  jobListTable: JobListTableDictionary,
  jobListTableTitle: string
}
