import { Dictionary } from "./Dictionary"

const baseDictionary = {
  time: '時刻',
  command: 'コマンド',
  title: 'タイトル' 
}

export const dictionary: Dictionary = {
  dailyTimelineTable: {
    column: {
      ...baseDictionary
    }
  },
  dailyTimelineTableTitle: '日時ジョブ',
  monthlyTimelineTable: {
    column: {
      day: '日',
      ...baseDictionary
    }
  },
  monthlyTimelineTableTitle: '月次ジョブ',
  yearlyTimelineTable: {
    column: {
      month: '月',
      day: '日',
      ...baseDictionary
    }
  },
  yearlyTimelineTableTitle: 'そのほかのジョブ',
  jobListTable: {
    field: {
      month: '月',
      day: '日',
      time: '時刻',
      command: 'コマンド'
    }
  },
  jobListTableTitle: 'ジョブ一覧'
}
