import { Router } from 'express'
// import { readJSON } from '../utils.js'
// import { randomUUID } from 'node:crypto'
// import { validateMovie, validatePartialMovie } from '../Schema/movies.js'
// import { MovieModel } from '../models/movie.js'
import { MovieController } from '../controller/movies.js'
// const moviesJSON = readJSON('./movies.json')
export const createMovieRouter = ({ movieModel }) => {
  const moviesRouter = Router()

  const movieController = new MovieController({ movieModel })

  moviesRouter.get('/', movieController.getAll)

  moviesRouter.get('/:id', movieController.getById)

  moviesRouter.post('/', movieController.create)

  moviesRouter.delete('/:id', movieController.delete)

  moviesRouter.patch('/:id', movieController.update)

  return moviesRouter
}
