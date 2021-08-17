import {
  createContext,
  Dispatch,
  ReactNode,
  useReducer,
  useContext,
} from 'react'
import {
  ReviewsAction,
  reviewsReducer,
  ReviewsState,
  initialState,
} from '../reducers/reviewsReducer'

type ReviewsContextProps = {
  state: ReviewsState
  dispatch: Dispatch<ReviewsAction>
}

const ReviewsContext = createContext<ReviewsContextProps>({
  state: initialState,
  dispatch: () => initialState,
})

export const ReviewsProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reviewsReducer, initialState)
  return (
    <ReviewsContext.Provider value={{ state, dispatch }}>
      {children}
    </ReviewsContext.Provider>
  )
}

export const useReviews = () => useContext(ReviewsContext)
