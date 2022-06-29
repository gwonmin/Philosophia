export interface User {
  _id?: string
  email: string
  password: string
  name: string
}

export interface Post {
  _id: string
  author: User
  title: string
  content: string
  //optional
  comment?: string[]
  tag?: string
  userStance?: any
  userLike?: any
}

export interface NewPost {
  title: string
  content: string
  //optional
  comment?: string[]
  tag?: string
}
