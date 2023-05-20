import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import * as yup from 'yup'
import userSchema from '../../schemas/user.js'

const schema = yup.object().shape(
  {
    email: yup.string().email().required(),
    password: yup.string().trim().min(6).required()
  }
)

export const login = async (req, res) => {

  try {

    const {
      email,
      password
    } = await schema.validate(req.body,
      {
        abortEarly: true
      }
    )

    const user = await userSchema.findOne({ email: email.trim() })

    if (!user) {
      return res.status(401).json(
        {
          success: false,
          message: 'User does not exist in our database'
        }
      )
    }

    const passInvalid = await bcrypt.compare(password, user.password)

    if (!passInvalid) {
      return res.status(401).json(
        {
          success: false,
          message: 'Your password is incorrect'
        }
      )
    }

    const token = jwt.sign(
      {
        id: user._id
      },
      process.env.SECRET_KEY_TOKEN,
      {
        expiresIn: '5d'
      }
    )

    return res.status(200).json(
      {
        name: user.user,
        success: true,
        authenticated: true,
        token,
        message: 'Login successfully'
      }
    )

  } catch (error) {
    console.log(error)
    return res.status(400).json(
      {
        success: false,
        message: 'We were unable to process your request'
      }
    )
  }
}
