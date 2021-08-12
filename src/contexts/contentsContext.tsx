import {
  createContext,
  Dispatch,
  ReactNode,
  useReducer,
  useContext,
} from 'react'
import {
  ContentsAction,
  commentsReducer,
  ContentsState,
  initialState,
} from '../reducers/contentsReducer'

type ContentsContextProps = {
  state: ContentsState
  dispatch: Dispatch<ContentsAction>
}

const ContentsContext = createContext<ContentsContextProps>({
  state: initialState,
  dispatch: () => initialState,
})

export const ContentsProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(commentsReducer, initialState)
  return (
    <ContentsContext.Provider value={{ state, dispatch }}>
      {children}
    </ContentsContext.Provider>
  )
}

export const useContents = () => useContext(ContentsContext)
