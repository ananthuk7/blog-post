import { DateTime } from 'luxon'

export interface Post {
  id: string
  title: string
  authorId: string
  created: string
  markup: string
  html: string
}

export interface TimeLinePost extends Omit<Post, 'created'> {
  created: DateTime
}

export const today: Post = {
  id: '1',
  authorId: '-1',
  title: 'Today',
  created: DateTime.now().toISO(),
  markup: '',
  html: ''
}
export const thisWeek: Post = {
  id: '2',
  authorId: '-1',
  title: 'This Week',
  created: DateTime.now().minus({ day: 5 }).toISO(),
  markup: '',
  html: ''
}
export const thisMonth: Post = {
  id: '3',
  authorId: '-1',
  title: 'This Month',
  created: DateTime.now().minus({ week: 3 }).toISO(),
  markup: '',
  html: ''
}
