import { Header } from './Header'
import { MyEditor } from './Editor'
import { Footer } from './Footer'
import { Container } from '@chakra-ui/layout'
export const ContentEditorPage = () => (
  <>
    <Header />
    <Container px={2} maxW='container.lg'>
      <MyEditor />
    </Container>
    <Footer />
  </>
)