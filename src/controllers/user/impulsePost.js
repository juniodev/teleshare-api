import * as yup from 'yup'
import postSchema from '../../schemas/user-post.js'
import userSchema from '../../schemas/user.js'

const schema = yup.object().shape(
  {
    telecoin: yup.number().max(50000).required(),
    postId: yup.string().trim().required()
  }
)

export const impulsePost = async (req, res) => {

  try {

    const {
      telecoin,
      postId
    } = await schema.validate(req.body,
      {
        abortEarly: true
      }
    )

    const id = req.userId

    const user = await userSchema.findById({ _id: id })

    if (parseInt(telecoin) > user.telecoin) {
      return res.status(400).json(
        {
          success: false,
          message: "You don't have enough TeleCoins"
        }
      )
    }

    const post = await postSchema.findById({ _id: postId })

    await postSchema.findByIdAndUpdate(
      postId,
      {
        telecoin: (telecoin + post.telecoin)
      }
    )

    const coin = user.telecoin - telecoin

    await userSchema.findByIdAndUpdate(
      id,
      {
        telecoin: coin
      }
    )

    return res.status(200).json(
      {
        success: true,
        message: 'Publication boosted'
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
