import { Center, Heading, VStack } from '@chakra-ui/react'
import { primaryTextColor } from '../theme'

export const MainVisual = () => {
  return (
    <Center>
      <VStack py={16}>
        <Heading color={primaryTextColor}>地域情報</Heading>
        
      </VStack>
    </Center>
  )
}