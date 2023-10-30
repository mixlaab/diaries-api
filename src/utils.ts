import { NewDiaryEntry } from './types'
import { Weather, Visibility } from './enums'

const isString = (param: any): boolean => {
  return typeof param === 'string'
}

const isDate = (param: any): boolean => {
  return !isNaN(Date.parse(param))
}

const isWeather = (param: any): boolean => {
  return Object.values(Weather).includes(param)
}

const isVisibility = (param: any): boolean => {
  return Object.values(Visibility).includes(param)
}

const parseDate = (rawDate: any): string => {
  if (!isString(rawDate) || !isDate(rawDate)) {
    throw new Error('Invalid date format')
  }

  return rawDate
}

const parseWeather = (rawWeather: any): Weather => {
  if (!isString(rawWeather) || !isWeather(rawWeather)) {
    throw new Error('Invalid weather format')
  }

  return rawWeather
}

const parseVisibility = (rawVisibility: any): Visibility => {
  if (!isString(rawVisibility) || !isVisibility(rawVisibility)) {
    throw new Error('Invalid visibility format')
  }

  return rawVisibility
}

const parseComment = (rawComment: any): string => {
  if (!isString(rawComment)) {
    throw new Error('Invalid comment format')
  }

  return rawComment
}

const toNewDiaryEntry = (rawDiary: any): NewDiaryEntry => {
  const currentDateISOString = new Date(Date.now()).toISOString()
  const parsedDiary: NewDiaryEntry = {
    date: parseDate(currentDateISOString),
    weather: parseWeather(rawDiary.weather),
    visibility: parseVisibility(rawDiary.visibility),
    comment: parseComment(rawDiary.comment)
  }
  return parsedDiary
}

export default toNewDiaryEntry
