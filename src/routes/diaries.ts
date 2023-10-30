import { Router, Request, Response, NextFunction, RequestHandler } from 'express'
// import * as diaryServices from '../../services/diaryServices'
import toNewDiaryEntry from '../utils'
import Diary from '../models/Diary'

const router = Router()

router.get('/', (_req, res) => {
  // res.send(diaryServices.getEntries())
  Diary.find({})
    .then(diaries => {
      console.log(diaries)
      res.status(200).json(diaries)
    })
    .catch(error => {
      console.error('Error fetching diaries', error)
      res.status(500).json({ error: 'Internal Server Error' })
    })
})

router.get('/:id', (async (req, res, next) => {
  // const diary = diaryServices.findById(+req.params.id)
  // diary !== undefined ? res.send(diary) : res.sendStatus(404)
  const diaryId = req.params.id
  try {
    const selectedDiary = await Diary.findById(diaryId)
    if (selectedDiary !== null) {
      // Case: Successfully get a diary with existing id
      return res.status(200).json(selectedDiary)
    } else {
      // Case: Attempted to get a diary with non-existing id using valid format
      return res.status(404).json({ success: false, message: 'Diary not found.' })
    }
  } catch (error) {
    // Case: Getting a diary with invalid id format or other error
    // return res.status(400).json({ success: false, message: 'Invalid diary id format or an error occurred.' })
    return next(error)
  }
}) as RequestHandler)

router.post('/', (req, res) => {
  try {
    const parsedDiary = toNewDiaryEntry(req.body)
    const newDiaryEntry = new Diary({
      date: parsedDiary.date,
      weather: parsedDiary.weather,
      visibility: parsedDiary.visibility,
      comment: parsedDiary.comment
    })
    newDiaryEntry.save().then((result) => {
      console.log('Diary entry saved', newDiaryEntry)
      res.json(result)
    }).catch((err) => {
      console.error(err)
    })
    // const addedDiary = diaryServices.addEntry(parsedDiary)
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).send(e.message)
    } else {
      res.status(400).send('An unknown error occurred')
    }
  }

  // const rawDiary = req.body
  // if (!rawDiary.content) {
  //   res.status(400).send(e.message)
  // }
})

router.delete('/:id', (async (req, res, next) => {
  const diaryId = req.params.id
  try {
    const deletedDiary = await Diary.findByIdAndDelete(diaryId)
    if (deletedDiary !== null) {
      // Case: Successfully deleted diary with existing id
      return res.status(200).json({ success: true, message: 'Diary deleted successfully.' })
    } else {
      // Case: Attempted to delete diary with non-existing id using valid format
      return res.status(404).json({ success: false, message: 'Diary not found.' })
    }
  } catch (error) {
    // Case: Deleting a diary with invalid id format or other error
    return next(error)
    // return res.status(400).json({ success: false, message: 'Invalid diary id format or an error occurred.' })
  }
}) as RequestHandler)

router.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.name)
  if (err.name === 'CastError') {
    res.status(400).json({ success: false, message: `Invalid diary id format -> ${String(err.reason)}` })
  } else {
    res.status(500).end()
  }
})

export default router
