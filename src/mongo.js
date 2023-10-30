const mongoose = require('mongoose')

mongoose
  .connect(process.env.MONGO_DB_URI)
  .then(() => {
    console.log('Database connected')
  })
  .catch((err) => console.error(err))
