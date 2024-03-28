const z = require('zod')

const schema = z.object({
  title: z.string({
    invalid_type_error: 'El título debe ser una STRING.',
    required_error: 'El título es requerido.'
  }),
  year: z.number().int().min(1900).max(2024),
  director: z.string(),
  duration: z.number().int().positive(),
  // duration: z.int().number().positive(),
  rate: z.number().min(0).max(10).default(5),
  poster: z.string().url(),
  genre: z.array(
    z.enum(['Action', 'Crime', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Thriller', 'Sci-Fi', 'Animation']),
    {
      required_error: 'El género es requerido.',
      invalid_type_error: 'El género de la película debe ser una serie de enum Género.'
    }
  )
})

function validateMovie (object) {
  return schema.safeParse(object)
}

function validatePartialMovie (object) {
  return schema.partial().safeParse(object)
}

module.exports = {
  validateMovie,
  validatePartialMovie
}
