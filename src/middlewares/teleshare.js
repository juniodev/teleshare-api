/* eslint-disable dot-notation */
import schemaApp from '../schemas/app.js'

export const checkApp = async (req, res, next) => {

  try {

    const appPackage = req.headers['package']
    const sig = req.headers['sig']

    if (!appPackage || !sig) {
      return res.status(403).json(
        {
          success: false,
          message: 'Not allowed'
        }
      )
    }

    const app = await schemaApp.findOne(
      { package: appPackage, sig }
    )

    if (!app) {
      return res.status(403).json(
        {
          success: false,
          message: 'Not allowed'
        }
      )
    }

    next()

  } catch (_) {
    return res.status(400).json(
      {
        success: false,
        message: 'We were unable to process your request'
      }
    )
  }
}
