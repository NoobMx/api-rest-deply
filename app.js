import express, { json } from 'express'
import { createMovieRouter } from './routes/movies.js'
import { corsMiddleware } from './middlewares/cors.js'
import 'dotenv/config.js'

export const createApp = ({ movieModel }) => {
  const app = express()
  const port = process.env.PORT ?? 3000
  app.use(json())
  app.use(corsMiddleware())
  app.disable('x-powered-by')
  app.use('/movies', createMovieRouter({ movieModel }))
  app.listen(port, () => {
    console.log(`http://localhost:${port}`)
  })
}
