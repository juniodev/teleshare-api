import userSchema from '../../schemas/user.js'

export const addTeleCoin = async (req, res) => {

  try {

    const { ad, lo } = req.headers

    if (ad !== '0' && lo !== '0') {
      return res.status(400).json(
        {
          success: false
        }
      )
    }

    const userId = req.userId

    const data = await userSchema.findById({ _id: userId })

    const coin = data.telecoin + 5

    await userSchema.findByIdAndUpdate(userId, { telecoin: coin })

    return res.status(200).json(
      {
        success: true,
        coin
      }
    )
  } catch (_) {
    return res.status(400).json(
      {
        success: false,
        message: 'We were unable to process your request'
      }
    )
  }
}
