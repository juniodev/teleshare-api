import userPostSchema from '../../schemas/user-post.js'

export const userPost = async (req, res) => {
  try {

    const myPosts = await userPostSchema.find(
      {
        userId: req.userId
      }
    )

    return res.status(200).json(
      {
        success: true,
        posts: myPosts
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
