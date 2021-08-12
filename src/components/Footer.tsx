import { Text, Box } from '@chakra-ui/layout'

export const Footer = () => {
  return (
    <Box>
      <Text align='center' color='gray.600' fontSize='sm'>
        Copyright: <a href='https://matsuzawa.dev'>matuzawa</a>
      </Text>
    </Box>
  )
}