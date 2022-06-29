export interface User {
  _id?: string
  email: string
  password: string
  name: string
}

export interface Essential_Post {
  _id: string
  author: User
  content: string
}

export interface Devate_Post extends Essential_Post {
  title: string
  comment: string[]
  tag: string
  userStance: string
  yes: string[]
  no: string[]
  visited?: string[]
}

export interface Free_Post extends Essential_Post {
  title: string
  comment: string[]
  visited: number
}

export interface Share_Post extends Essential_Post {
  philosopher: string
  subject: string
  userLike: boolean
  like: string[]
  likeCount: number
}

export interface Phil_Post extends Essential_Post {
  philosopherName: string
  title: string
  comment: string[]
}
export type Post = Devate_Post & Share_Post & Free_Post & Phil_Post

export interface NewPost {
  title: string
  content: string
}