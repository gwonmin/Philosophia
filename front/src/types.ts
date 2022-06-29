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
  comment?: string[]
}
