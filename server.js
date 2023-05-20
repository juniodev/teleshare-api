import cors from 'cors'
import env from 'dotenv'
import express, { json, urlencoded } from 'express'
import helmet from 'helmet'
import router from './src/router/router.js'

import mongoConnect from './src/databases/mongo-connect.js'
import checkErroApi from './src/middlewares/check-erro-api.js'
import { exeScraping } from './src/scraping/scraping.js'

const app = express()
env.config()

app.use(urlencoded({ extended: false }))
app.use(json())
app.use(cors())
app.use(helmet())
app.use(checkErroApi)
app.use(router)

const PORT = process.env.PORT || 3001

app.listen(PORT, async () => {
  try {
    await mongoConnect()
    app.emit('mongo-connected')
  } catch (err) {
    throw err
  }
})

app.addListener('mongo-connected', async () => {
  try {
    await exeScraping()
  } catch (error) {
    console.log(error)
  }
  console.log(`Server listening on ${PORT}`)
})
