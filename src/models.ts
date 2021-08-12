export type IUser = {
  displayName: string | null | undefined
  photoURL: string | null | undefined
}
export type IContent = {
  user: IUser
  contentType: string
  title: string
  content: string
  createdAt: Date
  id: string
}
export type IContentAdd = {
  user: IUser
  contentType: string
  title: string
  content: string
}
