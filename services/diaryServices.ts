import { DiaryEntry, NewDiaryEntry, NonSensitiveInfoDiaryEntry } from '../src/types'
import diaryData from './diaries.json'

const diaries: DiaryEntry[] = diaryData as DiaryEntry[]
export const getEntries = (): DiaryEntry[] => diaries
export const getEntriesWithoutSensitiveInfo = (): NonSensitiveInfoDiaryEntry[] => {
  return diaries.map(({ id, date, weather, visibility }) => ({ id, date, weather, visibility }))
}
export const findById = (id: number): NonSensitiveInfoDiaryEntry | undefined => {
  const entry = diaries.find(diary => diary.id === id)
  if (entry !== undefined) {
    const { comment, ...restOfDiary } = entry
    return restOfDiary
  }
  return undefined
}
export const addEntry = (diary: NewDiaryEntry): DiaryEntry => {
  const entry = {
    id: diaries.length + 1,
    ...diary
  }
  diaries.push(entry)
  return entry
}
