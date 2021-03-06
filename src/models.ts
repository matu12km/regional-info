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
export type IReview = {
  sex: string
  attribute: string
  prefectures: string
  municipalities: string
  review: string
  createdAt: Date
  id: string
}
export type IReviewAdd = {
  user: IUser
  sex: string
  attribute: string
  prefectures: string
  municipalities: string
  review: string
}
