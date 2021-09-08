import { ReactEditor } from '../tool/Editor'
import { Header } from './Header'
import { Footer } from './Footer'
import { Container } from '@chakra-ui/layout'

export const RichEditor = () => {

  return (
    <>
    <Header />
    <Container px={2} maxW='container.lg'>
      <ReactEditor />
    </Container>
    <Footer />
    </>
  )
}