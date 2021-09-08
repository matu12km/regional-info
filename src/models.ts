import { OutputBlockData } from "@editorjs/editorjs"

export type IUser = {
  displayName: string | null | undefined
  photoURL: string | null | undefined
}
export type IContent = {
  user: IUser
  contentType: string
  prefectures: string
  municipalities: string
  title: string
  content: {
    version?: string;
    time?: number;
    blocks: OutputBlockData[]
  }
  createdAt: Date
  id: string
}
export type IContents = IContent[]

export type IContentAdd = {
  user: IUser
  contentType: string
  prefectures: string
  municipalities: string
  title: string
  content: {
    version?: string;
    time?: number;
    blocks: OutputBlockData[]
  }
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
