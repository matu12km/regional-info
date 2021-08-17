import { Header } from './Header'
import { ReviewList } from './ReviewList'
import { Footer } from './Footer'
import { Container } from '@chakra-ui/layout'
export const ReviewPage = () => (
  <>
    <Header />
    <Container px={2} maxW='container.lg'>
      <ReviewList />
    </Container>
    <Footer />
  </>
)