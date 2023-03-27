import type { User } from './../user'
import express, { type Request, type Response } from 'express'
import cors from 'cors'
import { thisMonth, thisWeek, today, type Post } from '../posts'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
const app = express()

app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json())

const JWT_TOKEN = 'jwt-secret'
const COOKIE = 'cookie-code'

const postList = [today, thisWeek, thisMonth]
const allUser = []

app.get('/post', (req, res) => {
  res.json(postList)
})

app.get('/current-user', (req, res) => {
  try {
    const token = req.cookies[COOKIE]
    const result = jwt.verify(token, JWT_TOKEN) as { id: string }
    res.json({ id: result.id })
  } catch (e) {
    res.status(404).end()
  }
})

app.post<{}, {}, Post>('/post', (req, res) => {
  const post = { ...req.body, id: (Math.random() * 100000).toFixed() }
  postList.push(post)
  res.json(post)
})

app.post<{}, {}, User>('/user', (req, res) => {
  const user = { ...req.body, id: (Math.random() * 100000).toFixed() }
  allUser.push(user)
  authenticate(user.id, req, res)
  const { password, ...rest } = user
  res.json(rest)
})

function authenticate(id: string, req: Request, res: Response) {
  const token = jwt.sign({ id }, JWT_TOKEN, {
    issuer: 'ananthu-krish',
    expiresIn: '30 days'
  })
  res.cookie(COOKIE, token, { httpOnly: true })
}

app.listen(8000, () => {
  console.log('listen at 8000')
})
