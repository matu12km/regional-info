import { Flex, Stack, VStack, Text, useBreakpointValue } from '@chakra-ui/react'

export const MainVisual = () => {
  return (
    <Flex
      w={'full'}
      h={'100vh'}
      backgroundImage={'url(https://picsum.photos/1200/600)'}
      backgroundSize={'cover'}
      backgroundPosition={'center center'}>
      <VStack
        w={'full'}
        justify={'center'}
        px={useBreakpointValue({ base: 4, md: 8 })}
        bgGradient={'linear(to-r, blackAlpha.600, transparent)'}>
        <Stack maxW={'2xl'} align={'flex-start'} spacing={6}>
        <Text
            color={'white'}
            fontWeight={700}
            lineHeight={1.2}
            fontSize={useBreakpointValue({ base: '3xl', md: '4xl' })}>
            Lorem ipsum dolor sit amet consectetur adipiscing elit sed do
            eiusmod tempor
          </Text>
        </Stack>
      </VStack>
      </Flex>
  )
}