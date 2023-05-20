import jwt from 'jsonwebtoken'
import userSchema from '../schemas/user.js'

export const token = async (req, res, next) => {

  try {

    const auth = req.headers.authorization

    if (!auth) {
      return res.status(401).json(
        {
          success: false,
          authenticated: false,
          message: 'Token not informed!'
        }
      )
    }

    const [, token] = auth.split(' ')

    const { id } = jwt.verify(token, process.env.SECRET_KEY_TOKEN)

    const user = await userSchema.findById({ _id: id })

    if (!user) {
      return res.status(401).json(
        {
          success: false,
          authenticated: false,
          message: 'User not found'
        }
      )
    }

    if (String(user._id) !== id) {
      return res.status(401).json(
        {
          success: false,
          authenticated: false,
          message: 'Unauthorized user'
        }
      )
    }

    req.userName = user.user
    req.userId = user._id
    next()

  } catch (_) {
    return res.status(401).json(
      {
        success: false,
        authenticated: false,
        message: 'Your session has expired'
      }
    )

  }
}
