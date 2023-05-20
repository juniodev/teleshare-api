import * as yup from 'yup'
import schemaApp from '../../schemas/app.js'

const schema = yup.object().shape(
  {
    sig: yup.string().trim().required(),
    package: yup.string().trim().required()
  }
)

export const appConfig = async (req, res) => {
  try {

    const { package: app, sig } = await schema.validate(req.body,
      {
        abortEarly: true
      }
    )

    const data = await schemaApp.findOne({ sig, package: app })

    if (data) {
      return res.status(400).json(
        {
          success: false,
          message: 'Application already registered'
        }
      )
    }

    await schemaApp.create({
      package: app,
      sig
    })

    return res.status(200).json(
      {
        success: true,
        message: 'Application successfully registered'
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
