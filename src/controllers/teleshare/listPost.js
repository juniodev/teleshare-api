import userPost from '../../schemas/user-post.js'
import { APPROVED } from '../../utils/enums.js'

export const listPost = async (req, res) => {
  try {

    const posts = await userPost.find({ status: APPROVED })

    const list = []

    for (let i = 0; i < posts.length; i++) {
      if (posts[i].telecoin > 0) {
        list.push(posts[i])
      }
    }

    const rn = Math.floor(Math.random() * list.length)

    const inpulse = list[rn]

    const customList = shuffle(posts)

    customList.splice(0, 0, inpulse)

    const listSend = customList.filter((a, i) => {
      return customList.indexOf(a) === i
    })

    const userId = req.userId

    const postId = listSend[0]._id

    let telecoin

    if (userId) {
      if (userId === listSend[0].userId) {
        telecoin = listSend[0].telecoin - 1
      } else {
        telecoin = listSend[0].telecoin
      }
    } else {
      telecoin = listSend[0].telecoin - 1
    }

    await userPost.findByIdAndUpdate(
      postId,
      { telecoin }
    )

    return res.status(200).json(
      {
        success: true,
        posts: listSend
      }
    )

  } catch (error) {
    return res.status(400).json(
      {
        success: false,
        message: 'We were unable to process your request'
      }
    )
  }
}

function shuffle (array) {
  for (let j, x, i = array.length; i; j = Math.floor(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x);
  return array
}
