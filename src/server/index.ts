import type { User } from './../user'
import express from 'express'
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

function authenticate(id: string) {
  const token = jwt.sign({ id }, JWT_TOKEN, {
    issuer: 'ananthu-krish',
    expiresIn: '30 days'
  })
  return token
}

const postList = [today, thisWeek, thisMonth]
const allUser: User[] = []

app.get('/post', (req, res) => {
  res.json(postList)
})

app.get('/current-user/:token', (req, res) => {
  try {
    const token = req.params.token
    const result = jwt.verify(token, JWT_TOKEN) as { id: string }
    res.json({ id: result.id })
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ message: 'Invalid token' })
    } else if (e instanceof jwt.TokenExpiredError) {
      res.status(401).json({ message: 'Token expired' })
    } else {
      res.status(500).json({ message: 'Internal server error' })
    }
  }
})

app.get('/logout', (req, res) => {
  res.cookie(COOKIE, '', { httpOnly: true })
  res.status(200).end()
})

app.post<{}, {}, Post>('/post', (req, res) => {
  const post = { ...req.body, id: (Math.random() * 100000).toFixed() }
  postList.push(post)
  res.json(post)
})

app.put<{}, {}, Post>('/post', (req, res) => {
  const index = postList.findIndex((item) => item.id === req.body.id)
  if (index === -1) {
    res.status(404).end()
  }
  postList[index] = { ...postList[index], ...req.body }
  res.json(postList[index])
})

app.post<{}, {}, User>('/user', (req, res) => {
  const user = { ...req.body, id: (Math.random() * 100000).toFixed() }
  allUser.push(user)
  const token = authenticate(user.id)
  const { password, ...rest } = user
  res.json({ rest, token: token })
})

app.post<{}, {}, { username: string; password: string }>('/login', (req, res) => {
  const targetUser = allUser.find((user) => user.username === req.body.username)
  if (!targetUser || targetUser.password !== req.body.password) {
    res.status(401).end()
  } else {
    authenticate(targetUser.id)
    res.status(200).end()
  }
})

app.listen(8000, () => {
  console.log('listen at 8000')
})
