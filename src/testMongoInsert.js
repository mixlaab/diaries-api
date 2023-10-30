require('dotenv').config({ path: '../.env' })

const mongoose = require('mongoose')
const { Schema, model } = require('mongoose')

mongoose
  .connect(process.env.MONGO_DB_URI)
  .then(() => {
    console.log('Database connected')
  })
  .catch((err) => console.error(err))

const diarySchema = new Schema({
  date: Date,
  weather: String,
  visibility: String,
  comment: String
})

const Diary = model('Diary', diarySchema)

// Diary.find({}).then(result => {
//   console.log('Diaries found', result)
//   mongoose.connection.close()
// }).catch(error => {
//   // Handle any potential errors
//   console.error('Error fetching diaries', error)
// })

const newDiaryEntry = new Diary({
  date: Date.now(),
  weather: true,
  visibility: 4,
  comment: 23
})

newDiaryEntry.save().then((result) => {
  console.log('Diary entry saved', newDiaryEntry)
  mongoose.connection.close()
}).catch((err) => {
  console.error(err)
})
