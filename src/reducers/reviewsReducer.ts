import { IReview } from '../models'

export type ReviewsAction =
  | { type: 'SET_REVIEWS'; reviews: IReview[] }
  | { type: 'ADD_REVIEW'; review: IReview }

export type ReviewsState = {
  reviews: IReview[]
}

export const initialState: ReviewsState = {
  reviews: [],
}

export const reviewsReducer = (
  state: ReviewsState,
  action: ReviewsAction
): ReviewsState => {
  switch (action.type) {
    case 'SET_REVIEWS':
      return { reviews: action.reviews }
    case 'ADD_REVIEW':
      return { reviews: [action.review, ...state.reviews] }
    default:
      return state
  }
}