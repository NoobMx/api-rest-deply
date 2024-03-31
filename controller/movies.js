// import { MovieModel } from '../models/local-file-system/movie.js'
import { MovieModel } from '../models/mysql/movie.js'
import { validateMovie, validatePartialMovie } from '../Schema/movies.js'

export class MovieController {
  static async getAll (req, res) {
    const { genre } = req.query
    const moviesJSON = await MovieModel.getAll({ genre })
    res.json(moviesJSON)
  }

  static async getById (req, res) {
    const { id } = req.params
    const movie = await MovieModel.getById({ id })
    // const movie = moviesJSON.find(movie => movie.id === id)
    if (movie) return res.json(movie)
    res.status(404).json({ error: 'Movie not found' })
  }

  static async create (req, res) {
    const result = validateMovie(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const newMovie = await MovieModel.create({ input: result.data })
    res.status(201).json(newMovie)
  }

  static async delete (req, res) {
    const { id } = req.params
    const result = await MovieModel.delete({ id })
    if (result === false) {
      return res.status(404).json({ error: 'Pelicula no encontrada ' })
    }
    return res.json({ message: 'Pelicula eliminada' })
  }

  static async update (req, res) {
    const result = validatePartialMovie(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const { id } = req.params
    const updateMovie = await MovieModel.update({ id, input: result.data })
    return res.json(updateMovie)
  }
}
