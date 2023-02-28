import { Dictionary } from "./Dictionary"

const baseDictionary = {
  time: 'Time',
  command: 'Command',
  title: 'Title' 
}

export const dictionary: Dictionary = {
  dailyTimelineTable: {
    column: {
      ...baseDictionary
    }
  },
  dailyTimelineTableTitle: 'Daily jobs',
  monthlyTimelineTable: {
    column: {
      day: 'Day',
      ...baseDictionary
    }
  },
  monthlyTimelineTableTitle: 'Monthly jobs',
  yearlyTimelineTable: {
    column: {
      month: 'Month',
      day: 'Day',
      ...baseDictionary
    }
  },
  yearlyTimelineTableTitle: 'Other jobs',
  jobListTable: {
    field: {
      month: 'Month',
      day: 'Day',
      time: 'Time',
      command: 'Command'
    }
  },
  jobListTableTitle: 'Job list'
}
