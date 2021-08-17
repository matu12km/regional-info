import { Button, Container, Text, Textarea, VStack, FormControl, FormLabel, Select } from '@chakra-ui/react'
import { useState } from 'react'
import { addReview } from '../api/reviewsApi'
import { useAuth } from '../contexts/authContext'
import { useReviews } from '../contexts/reviewsContext'
import { IReviewAdd } from '../models'

export const ReviewEditor = () => {
  const { user } = useAuth()
  const { dispatch } = useReviews()
  const [sex, setSex] = useState('')
  const [attribute, setAttribute] = useState('')
  const [prefectures, setPrefectures] = useState('')
  const [municipalities, setMunicipalities] = useState('')
  const [review, setReview] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (review !== '' && user) {
      const toPost: IReviewAdd = {
        user: { displayName: user.displayName, photoURL: user.photoURL },
        sex,
        attribute,
        prefectures,
        municipalities,
        review,
      }
      addReview({ ...toPost })
      dispatch({
        type: 'ADD_REVIEW',
        review: {
          ...toPost,
          createdAt: new Date(),
          id: Date(),
        },
      })
    } else if (!user) {
      alert('Sign in first')
    }
    setSex('')
    setAttribute('')
    setPrefectures('')
    setMunicipalities('')
    setReview('')
  }
  const sexChange = (e: React.FormEvent<HTMLSelectElement>) => {
    setSex(e.currentTarget.value)
  }
  const attributeChange = (e: React.FormEvent<HTMLSelectElement>) => {
    setAttribute(e.currentTarget.value)
  }
  const prefecturesChange = (e: React.FormEvent<HTMLSelectElement>) => {
    setPrefectures(e.currentTarget.value)
  }
  const municipalitiesChange = (e: React.FormEvent<HTMLSelectElement>) => {
    setMunicipalities(e.currentTarget.value)
  }
  const reviewChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setReview(e.currentTarget.value)
  }

  return (
    <Container maxW="container.lg">
      {user ? <Text>welcome back, {user.displayName}! </Text> : null}
      <VStack
        as='form'
        onSubmit={handleSubmit}
        p={4}
        pb={2}
        bg='white'
        rounded='md'
        shadow='md'
        alignItems='flex-start'
      >
        <FormControl id="sex" isRequired>
          <FormLabel>性別</FormLabel>
          <Select placeholder="性別を選んでください。" value={sex} onChange={sexChange}>
            <option>男性</option>
            <option>女性</option>
            <option>その他</option>
          </Select>
        </FormControl>
        <FormControl id="attribute" isRequired>
          <FormLabel>属性</FormLabel>
          <Select placeholder="属性の種類を選んでください。" value={attribute} onChange={attributeChange}>
            <option>地域活動団体</option>
            <option>個人(協力隊等)</option>
            <option>その他</option>
          </Select>
        </FormControl>
        <FormControl id="prefectures" isRequired>
          <FormLabel>都道府県</FormLabel>
          <Select placeholder="都道府県を選んでください。" value={prefectures} onChange={prefecturesChange}>
            <option>○○県</option>
            <option>○×県</option>
            <option>●◇県</option>
          </Select>
        </FormControl>
        <FormControl id="municipalities" isRequired>
          <FormLabel>市町村</FormLabel>
          <Select placeholder="市町村を選んでください。" value={municipalities} onChange={municipalitiesChange}>
            <option>○○市</option>
            <option>○×町</option>
            <option>●◇村</option>
          </Select>
        </FormControl>
        <FormControl id='review' isRequired>
          <FormLabel>内容</FormLabel>
          <Textarea
            name='review'
            value={review}
            onChange={reviewChange}
            placeholder="レビュー"
          />
        </FormControl>
        <div className='arign-right'>
          <Button type='submit' colorScheme='orange'>
            投稿
          </Button>
        </div>
      </VStack>
    </Container>
  )
}