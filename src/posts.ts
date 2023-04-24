import { DateTime } from 'luxon'

export interface Post {
  id: string
  title: string
  authorId: string
  created: string
  last_updated: string
  markup: string
  html: string
}

export interface TimeLinePost extends Omit<Post, 'created' | 'last_updated'> {
  created: DateTime
  last_updated: DateTime | undefined
}

export const today: Post = {
  id: '1',
  authorId: '-1',
  title: 'Today',
  last_updated: DateTime.now().minus({ day: 2 }).toISO(),
  created: DateTime.now().toISO(),
  markup: '',
  html: ''
}
export const thisWeek: Post = {
  id: '2',
  authorId: '-1',
  title: 'This Week',
  last_updated: DateTime.now().minus({ day: 6 }).toISO(),
  created: DateTime.now().minus({ day: 5 }).toISO(),
  markup: '',
  html: ''
}
export const thisMonth: Post = {
  id: '3',
  authorId: '-1',
  title: 'This Month',
  last_updated: DateTime.now().minus({ day: 3 }).toISO(),
  created: DateTime.now().minus({ week: 3 }).toISO(),
  markup: '',
  html: ''
}
