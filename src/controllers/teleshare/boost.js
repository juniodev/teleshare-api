import axios from 'axios'
import * as cheerio from 'cheerio'
import userPost from '../../schemas/user-post.js'

export const boost = async (req, res) => {
  try {

    const posts = await userPost.find({})
    const list = []

    for (let i = 0; i < posts.length; i++) {
      if (posts[i].telecoin > 0) {
        list.push(posts[i])
      }
    }

    if (list.length === 0) {
      return res.status(400).json(
        {
          success: false
        }
      )
    }

    const ramdom = Math.floor(Math.random() * list.length)

    const selected = list[ramdom]

    const { data } = await axios.get(
      selected.url
    )

    const $ = cheerio.load(data)
    let img

    $('.tgme_page_photo_image').each((_idx, el) => {
      img = $(el).attr().src
    })

    const mylist = {
      userId: selected.userId,
      title: selected.title,
      description: selected.description,
      category: selected.category,
      type: selected.type,
      url: selected.url,
      img
    }

    return res.status(200).json(
      {
        success: true,
        boost: mylist
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
