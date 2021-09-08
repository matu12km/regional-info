import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { theme } from './theme'
import { Login } from './components/Login'
import { Home } from './components/Home'
import { ReviewPage } from './components/ReviewPage'
import { ReviewEditorPage } from './components/ReviewEditorPage'
import { AuthProvider } from './contexts/authContext'
import { ContentsProvider } from './contexts/contentsContext'
import { ReviewsProvider } from './contexts/reviewsContext'
import { RichEditor } from './components/RichEditor'
import { ContentPage } from './components/ContentPage'
import { ContentsList } from './components/ContentsList'

function App() {
  return (
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <ReviewsProvider>
          <Router>
            <Switch>
              <Route path='/review' component={ReviewPage} />
              <Route path='/reviewEditor' component={ReviewEditorPage} />
            </Switch>
          </Router>
        </ReviewsProvider>
        <ContentsProvider>
          <Router>
            <Switch>
              <Route path='/' exact component={Home} />
              <Route path='/contentEditor' component={RichEditor} />
              <Route path='/contentsList' component={ContentsList} />
                  <Route
                    path="/contents/:postId"
                    render={({ match }) => (
                      <ContentPage
                        match={match}
                      />
                    )}
                  />

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