import * as yup from 'yup'
import postFavorite from '../../schemas/favorite.js'

const schema = yup.object().shape(
  {
    id: yup.string().trim().required()
  }
)

export const addFavorite = async (req, res) => {

  try {

    const { id } = await schema.validate(req.body,
      {
        abortEarly: true
      }
    )

    const post = {
      user: req.userId,
      post_id: id
    }

    await postFavorite.create(post)

    return res.status(200).json(
      {
        success: true,
        message: 'Post added to favorites'
      }
    )

  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return res.status(400).json(
        {
          success: false,
          message: error.message
        }
      )
    }
    return res.status(400).json(
      {
        success: false,
        message: 'Could not add to favorites'
      }
    )
  }

}
