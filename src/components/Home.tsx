import { NewContentList } from './NewContentList'
import { Concept } from './Concept'
import { MainVisual } from './MainVisual'
import { Header } from './Header'
import { Footer } from './Footer'
import { Container } from '@chakra-ui/layout'
export const Home = () => (
  <>
    <Header />
    <MainVisual />
    <Container px={2} maxW='container.lg'>
      <NewContentList />
      <Concept />
    </Container>
    <Footer />
  </>
)