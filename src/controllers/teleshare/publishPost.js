import axios from 'axios'
import * as cheerio from 'cheerio'
import * as yup from 'yup'
import userPost from '../../schemas/user-post.js'
import { PENDING } from '../../utils/enums.js'

const schema = yup.object().shape(
  {
    title: yup.string().trim().required(),
    description: yup.string().trim().required(),
    url: yup.string().url().trim().required(),
    category: yup.string().trim().required(),
    telegram_type: yup.number().required(),
    sub: yup.string().trim().required()
  }
)

export const publishPost = async (req, res) => {

  try {

    const {
      title,
      description,
      url,
      category,
      telegram_type,
      sub
    } = await schema.validate(req.body,
      {
        abortEarly: true
      }
    )

    const id = req.userId

    const existPost = await userPost.findOne({ url, userId: id })

    if (existPost) {
      return res.status(400).json(
        {
          success: false,
          message: "You've already published this group, bot, or channel."
        }
      )
    }

    const { data } = await axios.get(
      url
    )
    const $ = cheerio.load(data)
    let img

    $('.tgme_page_photo_image').each((_idx, el) => {
      img = $(el).attr().src
    })

    const post = {
      userId: req.userId,
      user: req.userName,
      title,
      description,
      url: url.trim(),
      img: img.trim(),
      telegram_type,
      category,
      sub: returMembers(sub, Number(telegram_type)),
      status: PENDING
    }

    await userPost.create(post)

    return res.status(200).json(
      {
        success: true,
        message: "Congratulations, now let's review your post, it will soon be approved."
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

function returMembers (member, type) {
  switch (type) {
    case 0:
      return `${member}Members`
    case 1:
      return `${member}Subscribers`
    case 2:
      return 'none'
  }
}
