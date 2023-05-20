import bcrypt from 'bcrypt'
import * as yup from 'yup'
import userSchema from '../../schemas/user.js'

const schema = yup.object().shape(
  {
    user: yup.string().trim().required(),
    email: yup.string().trim().email().required(),
    password: yup.string().trim().min(6).required()
  }
)

export const register = async (req, res) => {

  try {

    const {
      user,
      email,
      password
    } = await schema.validate(req.body,
      {
        abortEarly: true
      }
    )

    const userExist = await userSchema.findOne({ email })

    if (userExist) {
      return res.status(400).json(
        {
          success: false,
          message: 'An account already exists for that email address'
        }
      )
    }

    const passCrypt = await bcrypt.hash(password, 10)

    const userData = {
      user,
      email,
      password: passCrypt
    }

    await userSchema.create(userData)

    return res.status(200).json(
      {
        success: true,
        message: 'Account created successfully'
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
