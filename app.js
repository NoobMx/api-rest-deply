import express, { json } from 'express'
// import { randomUUID } from 'node:crypto'
// import moviesJSON from './movies.json' with { type: 'json' }
// import cors from 'cors'
import { moviesRouter } from './routes/movies.js'
import { corsMiddleware } from './middlewares/cors.js'
// import { validateMovie, validatePartialMovie } from './Schema/movies.js'
// import { readJSON } from './utils.js'

// const moviesJSON = readJSON('./movies.json')

const app = express()
const port = process.env.PORT ?? 3000
app.use(json())
// app.use(cors())
app.use(corsMiddleware())

app.disable('x-powered-by')

app.use('/movies', moviesRouter)
// app.get('/movies', todo)

// app.post('/movies', todo)

// app.get('/movies/:id', todo)

// app.delete('/movies/:id', todo)

// app.patch('/movies/:id', todo)

// app.options('/movies/:id', (req, res) => {
//   const origin = req.header('origin')

//   if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
//     res.header('Access-Control-Allow-Origin', origin)
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT , PATCH, DELETE')
//   }
//   res.send(200)
// })

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
