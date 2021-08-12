  
import { IContent } from '../models'

export type ContentsAction =
  | { type: 'SET_CONTENTS'; contents: IContent[] }
  | { type: 'ADD_CONTENT'; content: IContent }

export type ContentsState = {
  contents: IContent[]
}

export const initialState: ContentsState = {
  contents: [],
}

export const commentsReducer = (
  state: ContentsState,
  action: ContentsAction
): ContentsState => {
  switch (action.type) {
    case 'SET_CONTENTS':
      return { contents: action.contents }
    case 'ADD_CONTENT':
      return { contents: [action.content, ...state.contents] }
    default:
      return state
  }
}