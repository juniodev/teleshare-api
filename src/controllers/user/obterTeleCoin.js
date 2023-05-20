import userSchema from '../../schemas/user.js'

export const obterTeleCoin = async (req, res) => {
  try {
    const id = req.userId

    const user = await userSchema.findById({ _id: id })

    return res.status(200).json(
      {
        success: true,
        coin: user.telecoin
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
