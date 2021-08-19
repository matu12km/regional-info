import {
  Box,
  Heading,
  Text,
  Stack,
  Button,
  Select,
} from '@chakra-ui/react'
import { useState } from 'react'
import { getReviews } from '../api/reviewsApi'
import { useReviews } from '../contexts/reviewsContext'


import { IReview } from '../models'
import Moment from 'moment'
import { Prefecture, PrefectureArray } from '../data/prefectures'

export const ReviewList = () => {

  const [prefectures, setPrefectures] = useState('')
  const {
    state: { reviews },
    dispatch,
  } = useReviews()

  const prefecturesChange = (e: React.FormEvent<HTMLSelectElement>) => {
    setPrefectures(e.currentTarget[e.currentTarget.selectedIndex].innerText)
  }

  const handleClick = (e: React.FormEvent) => {
    getReviews(prefectures).then((data) => {
      dispatch({ type: 'SET_REVIEWS', reviews: data })
    })
  }

  return (
    <>
      <Box>
        <Heading mb={2} as='h2' size='lg' color='gray.600'>
          レビュー
        </Heading>
        <Heading as='h3' size='md'>検索</Heading>
        <Stack as='form' bg='white' mb={3} p={6}>
          <Stack direction={'row'} spacing={5} fontSize={'md'} >
            <Text>都道府県</Text>
            <Select placeholder="都道府県を選んでください。" value={prefectures} onChange={prefecturesChange}>
              {PrefectureArray.map((prefecture: Prefecture) => (
                <option key={prefecture.id} value={prefecture.id}>{prefecture.name}</option>
              ))}
            </Select>
          </Stack>
          <Button onClick={handleClick} colorScheme='orange'>検索</Button>
        </Stack>
        <Heading as='h3' size='md'>検索結果</Heading>
        {reviews === [] ? (
          <p>No Post</p>
        ) : (

          reviews.map((review) => (
            <ReviewBox key={review.id} review={review} />
          ))
        )}
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