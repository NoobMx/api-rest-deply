import { Router } from 'express'
// import { readJSON } from '../utils.js'
// import { randomUUID } from 'node:crypto'
// import { validateMovie, validatePartialMovie } from '../Schema/movies.js'
// import { MovieModel } from '../models/movie.js'
import { MovieController } from '../controller/movies.js'
// const moviesJSON = readJSON('./movies.json')

export const moviesRouter = Router()

moviesRouter.get('/', MovieController.getAll)

moviesRouter.get('/:id', MovieController.getById)

moviesRouter.post('/', MovieController.create)

moviesRouter.delete('/:id', MovieController.delete)

moviesRouter.patch('/:id', MovieController.update)
