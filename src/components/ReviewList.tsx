import {
  Box,
  Heading,
  Text,
  Stack,
  Input,
  Button,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { getReviews } from '../api/reviewsApi'
import { useReviews } from '../contexts/reviewsContext'


import { IReview } from '../models'
import Moment from 'moment'

export const ReviewList = () => {
  
  const {
    state: { reviews },
    dispatch,
  } = useReviews()
  useEffect(() => {
    getReviews().then((data) => {
      dispatch({ type: 'SET_REVIEWS', reviews: data })
    })
  }, [dispatch])
  //検索用
  let dataList = reviews
  const [prefectures, setPrefectures] = useState('')
  const [attribute, setAttribute] = useState('')
  const [freeWord, setFreeWord] = useState('')
  const prefecturesChange = (e: React.FormEvent<HTMLInputElement>) => {
    setPrefectures(e.currentTarget.value)
  }
  const attributeChange = (e: React.FormEvent<HTMLInputElement>) => {
    setAttribute(e.currentTarget.value)
  }
  const freeWordChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFreeWord(e.currentTarget.value)
  }
  const handleClick = (e: React.FormEvent) => {
    if (prefectures !== '') {
      dataList.filter(value=> value.prefectures === prefectures)
    }
    if (attribute !== '') {
      dataList.filter(value=> value.attribute === attribute)
    }
    if (freeWord !== '') {
      dataList.filter(value=> value.review.match(freeWord))
    }
  }

  return (
    <>
      <Box>
        <Heading mb={2} as='h2' size='lg' color='gray.600'>
          レビュー
        </Heading>
        <Stack as='form'>
          <Input placeholder='都道府県からさがず' value={prefectures || ''} onChange={prefecturesChange} />
          <Input placeholder='所属からさがす' value={attribute || ''} onChange={attributeChange}/>
          <Input placeholder='フリーワード検索' value={freeWord || ''} onChange={freeWordChange} />
          <Button onClick={handleClick}>検索</Button>
        </Stack>
        {dataList === [] ? (
          <p>No Post</p>
        ) : (
            
          dataList.map((review) => (
            <ReviewBox key={review.id} review={review} />
          ))
        )}
        {console.log(dataList)}
      </Box>
    </>
  )
}

const ReviewBox = ({ review }: { review: IReview }) => {
  return (
    <>
      <Box
        bg={'white'}
        boxShadow={'2sm'}
        rounded={'md'}
        p={6}
        mr={2}
        mb={2}
        overflow={'hidden'}
      >
        <Stack>
          <Stack direction={'row'} spacing={3} fontSize={'sm'}>
            <Text color={'green.800'}>{review.prefectures}</Text>
            <Text color={'green.800'}>{review.municipalities}</Text>
            <Text color={'green.800'}>の口コミ情報</Text>
          </Stack>
          <Stack direction={'row'} spacing={3} fontSize={'md'}>
            <Text
              color={'gray.800'}
              textTransform={'uppercase'}
              fontSize={'sm'}
              letterSpacing={1.1}>
              回答者：
            </Text>
            <Text
              color={'gray.500'}
              textTransform={'uppercase'}
              fontSize={'sm'}
              letterSpacing={1.1}>
              {review.attribute}
            </Text>
          </Stack>

          <Text color={'gray.900'} fontSize={'md'}>
            口コミ：
          </Text>
          <Text color={'gray.900'} fontSize={'md'}>
            {review.review}
          </Text>
        </Stack>
        <Stack mt={6} direction={'row'} spacing={4} align={'center'} fontSize={'sm'}>
        <Text color={'gray.500'}>口コミ投稿日：</Text>
          <Text color={'gray.500'}>{Moment(review.createdAt).format('YYYY-MM-DD')}</Text>

        </Stack>
      </Box>
    </>
  )
}