import {
  HStack,
  Box,
  Avatar,
  Heading,
  Text,
  Center,
  Stack,
  Modal,
  Image,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from '@chakra-ui/react'
import { useEffect } from 'react'
import Slider from "react-slick";
import { getContents } from '../api/contentsApi'
import { useContents } from '../contexts/contentsContext'

import { IContent } from '../models'
import { primaryColor } from '../theme'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/slick.css";

export const NewContentList = () => {
  const {
    state: { contents },
    dispatch,
  } = useContents()
  useEffect(() => {
    getContents().then((data) => {
      dispatch({ type: 'SET_CONTENTS', contents: data })
    })
  }, [dispatch])
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    swipeToSlide: true,
  }

  return (
    <>
      <Heading mt={4} mb={2} as='h2' size='lg' color='gray.600'>
        新着情報
      </Heading>
      <Slider {...sliderSettings}>
        {contents === [] ? (
          <p>No Post</p>
        ) : (
          contents.map((content) => (
            <ModalWindow key={content.id} content={content} />
          ))
        )}
      </Slider>
    </>
  )
}

const ModalWindow = ({ content }: { content: IContent }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Box
        className='cursor-pointer'
        bg={'white'}
        boxShadow={'2sm'}
        rounded={'md'}
        p={6}
        mr={2}
        overflow={'hidden'}
        onClick={onOpen}
      >
        <Box
          bg={'gray.100'}
          mt={-6}
          mx={-6}
          mb={6}
          pos={'relative'}>
          <Image
            src={
              'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
            }
            layout={'fill'}
          />
        </Box>
        <Stack>
          <Text
            color={'green.500'}
            textTransform={'uppercase'}
            fontWeight={800}
            fontSize={'sm'}
            letterSpacing={1.1}>
            {content.contentType}
          </Text>
          <Heading
            color={'gray.700'}
            fontSize={'2xl'}
            fontFamily={'body'}>
            {content.title}
          </Heading>
          <Text color={'gray.500'} isTruncated>
            {content.content}
          </Text>
        </Stack>
        <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
          <Avatar
            size='xs'
            src={content.user.photoURL ? content.user.photoURL : undefined}
            bg={primaryColor}
          ></Avatar>
          <Stack direction={'column'} spacing={0} fontSize={'sm'}>
            <Text fontWeight={600}>{content.user.displayName}</Text>
            <Text color={'gray.500'}>{content.createdAt.toLocaleString()}</Text>
          </Stack>
        </Stack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{content.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center  className="test">
              <Image src='https://via.placeholder.com/150' alt='test' />
            </Center>
            <HStack mb={2}>
              <Avatar
                size='xs'
                src={content.user.photoURL ? content.user.photoURL : undefined}
                bg={primaryColor}
              ></Avatar>
              <Heading size='xs' color='gray.700'>
                {content.user.displayName}
              </Heading>
            </HStack>
            <Text color='gray.400' my={2} fontSize='sm' align='end'>
              {content.createdAt.toLocaleString()}
            </Text>
            <Text>{content.content}</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}