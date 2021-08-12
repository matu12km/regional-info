import { NewContentList } from './NewContentList'
import { Concept } from './Concept'
import { MainVisual } from './MainVisual'
import { Footer } from './Footer'
import { Container } from '@chakra-ui/layout'
export const Home = () => (
  <Container px={2} maxW='container.lg'>
    <MainVisual />
    <NewContentList />
    <Concept />
    <Footer />
  </Container>
)