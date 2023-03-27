import { DateTime } from 'luxon'

export interface Post {
  id: string
  title: string
  created: string
  markup: string
  html: string
}

export interface TimeLinePost extends Omit<Post, 'created'> {
  created: DateTime
}

export const today: Post = {
  id: '1',
  title: 'Today',
  created: DateTime.now().toISO(),
  markup: '',
  html: ''
}
export const thisWeek: Post = {
  id: '2',
  title: 'This Week',
  created: DateTime.now().minus({ day: 5 }).toISO(),
  markup: '',
  html: ''
}
export const thisMonth: Post = {
  id: '3',
  title: 'This Month',
  created: DateTime.now().minus({ week: 3 }).toISO(),
  markup: '',
  html: ''  
}
