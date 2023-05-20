import axios from 'axios'
import * as cheerio from 'cheerio'
import cron from 'node-cron'
import userPost from '../schemas/user-post.js'

export const exeScraping = async () => {
  const job = cron.schedule('*/59 * * * *', async () => {
    await updateMembers()
  })
  job.start()
}

async function updateMembers () {

  const posts = await userPost.find({ status: 1 })

  for (let i = 0; i < posts.length; i++) {
    await scraping(posts, i, posts[i]._id)
  }

}

async function scraping (posts, i, id) {
  return new Promise((resolve, reject) => {
    update(resolve, reject, posts, i, id)
  })
}

const getPostMembers = async (url, id) => {
  try {
    const { data } = await axios.get(
      url
    )
    const $ = cheerio.load(data)
    let members
    let img

    $('.tgme_page_extra').each((_idx, el) => {
      members = $(el).text()
    })

    $('.tgme_page_photo_image').each((_idx, el) => {
      img = $(el).attr().src
    })

    return {
      sub: members.split(',')[0],
      img
    }
  } catch (error) {
    try {
      await reprovePost(id)
    } catch (erro) {
      throw erro
    }
    throw error
  }
}

async function reprovePost (id) {
  try {

    await userPost.findByIdAndUpdate(
      id,
      { status: 0 }
    )

  } catch (error) {
    throw error
  }
}

async function update (resolve, reject, posts, i, id) {

  try {

    const data = await getPostMembers(posts[i].url, id)

    await userPost.updateOne(
      { _id: posts[i]._id },
      { sub: data.sub, img: data.img }
    )

    setTimeout(() => {
      resolve()
    }, 5000)
  } catch (_) {
    resolve()
  }

}
