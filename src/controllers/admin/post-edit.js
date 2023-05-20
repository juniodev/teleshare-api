import * as yup from 'yup'
import postSchema from '../../schemas/user-post.js'

const schema = yup.object().shape({
  title: yup.string().trim().required(),
  description: yup.string().trim().required(),
  url: yup.string().trim().url().required(),
  status: yup.string().trim().required(),
  id: yup.string().trim().required(),
  userId: yup.string().trim().required()
})

export const postEdit = async (req, res) => {
  try {
    const { id, userId, title, description, url, status } =
      await schema.validate(req.body, {
        abortEarly: true
      })

    const update = await postSchema.updateOne(
      { _id: id, userId },
      {
        title,
        description,
        url,
        status
      }
    )

    return res.status(200).json({
      message: 'Post successfully updated',
      success: true,
      update
    })
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return res.status(400).json({
        success: false,
        message: error.message
      })
    }
    return res.status(400).json({
      success: false,
      message: 'We were unable to process your request'
    })
  }
}
