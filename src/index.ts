import express from 'express'
import diaryRouter from './routes/diaries'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

require('./mongo')

const PORT = process.env.PORT ?? 3333
const app = express()

app.use(cors())
app.use(express.json())

app.get('/ping', (_, res) => {
  console.log('Someone pinged here!: ' + new Date().toLocaleDateString())
  res.send('pong')
})

app.use('/api/diaries', diaryRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
