import { Header } from './Header'
import { ReviewEditor } from './ReviewEditor'
import { Footer } from './Footer'
import { Container } from '@chakra-ui/layout'
export const ReviewEditorPage = () => (
  <>
    <Header />
    <Container px={2} maxW='container.lg'>
      <ReviewEditor />
    </Container>
    <Footer />
  </>
)