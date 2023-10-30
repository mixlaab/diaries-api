import { Schema, model, Document, Model } from 'mongoose'
import { Weather, Visibility } from '../enums'

interface DiaryDocument extends Document {
  date: Date
  weather: Weather
  visibility: Visibility
  comment: string
}

const diarySchema = new Schema<DiaryDocument>({
  date: Date,
  weather: String,
  visibility: String,
  comment: String
})

diarySchema.set('toJSON', {
  transform: (_document, object) => {
    // Remove properties from the JSON representation
    object.id = object._id
    delete object._id
    delete object.__v
    return object
  }
})

const Diary: Model<DiaryDocument> = model('Diary', diarySchema)

export default Diary

// Diary.find({}).then(result => {
//   console.log('Diaries found', result)
//   mongoose.connection.close()
// })

// const newDiaryEntry = new Diary({
//   date: Date.now(),
//   weather: 'rainy',
//   visibility: 'poor',
//   comment: 'A rainy day!'
// })

// newDiaryEntry.save().then((result) => {
//   console.log('Diary entry saved', newDiaryEntry)
//   mongoose.connection.close()
// }).catch((err) => {
//   console.error(err)
// })
