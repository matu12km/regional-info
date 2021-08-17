import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { theme } from './theme'
import { Login } from './components/Login'
import { Home } from './components/Home'
import { ContentEditorPage } from './components/ContentEditorPage'
import { ReviewPage } from './components/ReviewPage'
import { ReviewEditorPage } from './components/ReviewEditorPage'
import { AuthProvider } from './contexts/authContext'
import { ContentsProvider } from './contexts/contentsContext'
import { ReviewsProvider } from './contexts/reviewsContext'

function App() {
  return (
    <AuthProvider>
      <ChakraProvider theme={theme}>
          <ReviewsProvider>
          <Router>
            <Switch>
              <Route path='/review' component={ReviewPage} />
              <Route path='/revieweditor' component={ReviewEditorPage} />
            </Switch>
          </Router>
          </ReviewsProvider>
        <ContentsProvider>
          <Router>
            <Switch>
              <Route path='/' exact component={Home} />
              <Route path='/editor' component={ContentEditorPage} />
              <Route path='/login' exact component={Login} />
            </Switch>
          </Router>
        </ContentsProvider>
          <Router>
            <Switch>
              <Route path='/login' exact component={Login} />
            </Switch>
          </Router>
      </ChakraProvider>
    </AuthProvider>
  )
}

export default App