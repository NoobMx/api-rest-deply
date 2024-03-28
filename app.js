const express = require('express')
const crypto = require('node:crypto')
const moviesJSON = require('./movies.json')
const cors = require('cors')
const { validateMovie, validatePartialMovie } = require('./Schema/movies')

const app = express()
const port = process.env.PORT ?? 3000
app.use(express.json())
// app.use(cors())
app.use(cors({
  origin: (origin, callback) => {
    const ACCEPTED_ORIGINS = [
      'http://192.168.1.70:8080',
      'http://127.0.0.1:8080',
      'http://localhost:3000'
    ]

    if (ACCEPTED_ORIGINS.includes(origin)) {
      return callback(null, true)
    }

    if (!origin) {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'))
  }
}))

app.disable('x-powered-by')

app.get('/movies', (req, res) => {
  // res.header('Access-Control-Allow-Origin', origin)
  // const origin = req.header('origin')

  // if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
  //   res.header('Access-Control-Allow-Origin', origin)
  // }

  const { genre } = req.query

  if (genre) {
    const filteredMovies = moviesJSON.filter(
      movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
    )
    return res.json(filteredMovies)
  }
  res.json(moviesJSON)
})

app.post('/movies', (req, res) => {
  const result = validateMovie(req.body)

  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const newMovie = {
    id: crypto.randomUUID(),
    ...result.data
  }

  moviesJSON.push(newMovie)
  res.status(201).json(newMovie)
})

app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  const movie = moviesJSON.find(movie => movie.id === id)
  if (movie) return res.json(movie)

  res.status(404).json({ error: 'Movie not found' })
})

app.delete('/movies/:id', (req, res) => {
  // const origin = req.header('origin')

  // if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
  //   res.header('Access-Control-Allow-Origin', origin)
  // }

  const { id } = req.params
  const movieIndex = moviesJSON.findIndex(movie => movie.id === id)

  if (movieIndex === -1) {
    return res.status(404).json({ error: 'Pelicula no encontrada ' })
  }

  moviesJSON.splice(movieIndex, 1)

  return res.json({ message: 'Pelicula eliminada' })
})

app.patch('/movies/:id', (req, res) => {
  const result = validatePartialMovie(req.body)

  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }
  const { id } = req.params
  const movieIndex = moviesJSON.findIndex(movie => movie.id === id)

  if (movieIndex === -1) {
    return res.status(404).json({ error: 'Pelicula no encontrada ' })
  }

  const updateMovie = {
    ...moviesJSON[movieIndex],
    ...result.data
  }

  moviesJSON[movieIndex] = updateMovie

  return res.json(updateMovie)
})

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
