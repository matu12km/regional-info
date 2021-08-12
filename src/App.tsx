import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { Header } from './components/Header'
import { theme } from './theme'
import { Login } from './components/Login'
import { Home } from './components/Home'
import { Editor } from './components/Editor'
import { AuthProvider } from './contexts/authContext'
import { ContentsProvider } from './contexts/contentsContext'

function App() {
  return (
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <ContentsProvider>
          <Router>
            <Header />
            <Switch>
              <Route exact path='/'>
                <Home />
              </Route>
              <Route path='/editor'>
                <Editor />
              </Route>
              <Route path='/login'>
                <Login />
              </Route>
            </Switch>
          </Router>
        </ContentsProvider>
      </ChakraProvider>
    </AuthProvider>
  )
}

export default App