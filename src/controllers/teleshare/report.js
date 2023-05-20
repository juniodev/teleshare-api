import * as yup from 'yup'
import userPost from '../../schemas/user-post.js'

const schema = yup.object().shape(
  {
    id: yup.string().trim().required()
  }
)

export const report = async (req, res) => {

  try {

    const { id } = await schema.validate(req.body,
      {
        abortEarly: true
      }
    )

    await userPost.updateOne(
      { _id: id },
      { reported: true }
    )

    return res.status(200).json(
      {
        success: true,
        message: 'This post has been reported'
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
        message: 'We were unable to process your request'
      }
    )
  }
}
