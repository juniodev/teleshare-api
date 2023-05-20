import { Router } from 'express'
import fs from 'fs'
import { postEdit } from '../controllers/admin/post-edit.js'
import { login } from '../controllers/auth/login.js'
import { register } from '../controllers/auth/register.js'
import { appConfig } from '../controllers/config/app-config.js'
import { addFavorite } from '../controllers/teleshare/addFavorite.js'
import { boost } from '../controllers/teleshare/boost.js'
import { listPost } from '../controllers/teleshare/listPost.js'
import { publishPost } from '../controllers/teleshare/publishPost.js'
import { report } from '../controllers/teleshare/report.js'
import { userPost } from '../controllers/teleshare/userPosts.js'
import { addTeleCoin } from '../controllers/user/addTeleCoin.js'
import { impulsePost } from '../controllers/user/impulsePost.js'
import { obterTeleCoin } from '../controllers/user/obterTeleCoin.js'
import { token } from '../middlewares/check-user.js'
import { checkApp } from '../middlewares/teleshare.js'

const route = Router()

route.post('/user/publish', token, publishPost)
route.post('/user/post/add/favorite', checkApp, token, addFavorite)
route.post('/post/report', checkApp, report)
route.get('/user/list/posts', token, checkApp, listPost)
route.get('/user/list/myposts', checkApp, token, userPost)
route.get('/post/boost', checkApp, boost)

route.get('/user/add/telecoin', checkApp, token, addTeleCoin)
route.get('/user/obter/telecoin', checkApp, token, obterTeleCoin)

route.post('/user/post/impulse', checkApp, token, impulsePost)

route.post('/user/login', checkApp, login)
route.post('/user/register', checkApp, register)

route.post('/app/config/authorization', appConfig)

route.post('/admin/posts/edit', token, postEdit)

route.get('/politica-termos', (req, res) => {
  const templatePath = 'src/html/politica.html'
  const template = fs.readFileSync(templatePath, 'utf-8')
  return res.send(template)
})

route.get('/app-ads.txt', (req, res) => {
  try {
    const templatePath = './app-ads.txt'
    const template = fs.readFileSync(templatePath, 'utf-8')
    return res.send(template)
  } catch (_) {
    return res.send('Not found')
  }
})

export default route
