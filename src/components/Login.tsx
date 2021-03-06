import { Center, Heading, VStack } from '@chakra-ui/layout'
import { primaryTextColor } from '../theme'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { firebase, auth } from '../firebase'

const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
}

export const Login = () => {
  return (
    <Center mt={8}>
      <VStack>
        <Heading size='md' color={primaryTextColor}>
          Log In
        </Heading>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
      </VStack>
    </Center>
  )
}