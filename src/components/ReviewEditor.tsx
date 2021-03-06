import { Button, Container, Text, Textarea, VStack, FormControl, FormLabel, Select } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { addReview } from '../api/reviewsApi'
import { useAuth } from '../contexts/authContext'
import { useReviews } from '../contexts/reviewsContext'
import { IReviewAdd } from '../models'
import { Prefecture, PrefectureArray } from '../data/prefectures'
import axios from 'axios'

export const ReviewEditor = () => {
  const { user } = useAuth()
  const { dispatch } = useReviews()
  const [sex, setSex] = useState('')
  const [attribute, setAttribute] = useState('')
  const [searchPrefecture, setSearchPrefecture] = useState('')
  const [municipalitiesList, setMunicipalitiesList] = useState([])
  const [prefectures, setPrefectures] = useState('')
  const [dataPrefecture, setDataPrefecture] = useState('')
  const [municipalities, setMunicipalities] = useState('')
  const [dataMunicipalities, setDataMunicipalities] = useState('')
  const [review, setReview] = useState('')

  useEffect(() => {
    if (searchPrefecture !== '') {
      const getMunicipalitiesList = async () => {
        const result = await axios.get('https://www.land.mlit.go.jp/webland/api/CitySearch?area=' + searchPrefecture)
        setMunicipalitiesList(result.data.data)
      }
      getMunicipalitiesList()
    }

  },[searchPrefecture])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (review !== '' && user) {
      const toPost: IReviewAdd = {
        user: { displayName: user.displayName, photoURL: user.photoURL },
        sex,
        attribute,
        prefectures: dataPrefecture,
        municipalities: dataMunicipalities,
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
    alert('Success!')
  }
  const sexChange = (e: React.FormEvent<HTMLSelectElement>) => {
    setSex(e.currentTarget.value)
  }
  const attributeChange = (e: React.FormEvent<HTMLSelectElement>) => {
    setAttribute(e.currentTarget.value)
  }
  const prefecturesChange = (e: React.FormEvent<HTMLSelectElement>) => {
    setPrefectures(e.currentTarget.value)
    setDataPrefecture(e.currentTarget[e.currentTarget.selectedIndex].innerText)
    let num = ("00" + e.currentTarget.value).slice(-2);
    setSearchPrefecture(num)
  }
  const municipalitiesChange = (e: React.FormEvent<HTMLSelectElement>) => {
    setMunicipalities(e.currentTarget.value)
    setDataMunicipalities(e.currentTarget[e.currentTarget.selectedIndex].innerText)
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
          <FormLabel>??????</FormLabel>
          <Select placeholder="?????????????????????????????????" value={sex} onChange={sexChange}>
            <option>??????</option>
            <option>??????</option>
            <option>?????????</option>
          </Select>
        </FormControl>
        <FormControl id="attribute" isRequired>
          <FormLabel>??????</FormLabel>
          <Select placeholder="??????????????????????????????????????????" value={attribute} onChange={attributeChange}>
            <option>??????????????????</option>
            <option>??????(????????????)</option>
            <option>?????????</option>
          </Select>
        </FormControl>
        <FormControl id="prefectures" isRequired>
          <FormLabel>????????????</FormLabel>
          <Select placeholder="???????????????????????????????????????" value={prefectures} onChange={prefecturesChange}>
            {PrefectureArray.map((prefecture: Prefecture) => (
              <option key={prefecture.id} value={prefecture.id}>{prefecture.name}</option>
            ))}
          </Select>
        </FormControl>
        <FormControl id="municipalities" isRequired>
          <FormLabel>?????????</FormLabel>
          <Select placeholder="????????????????????????????????????" value={municipalities} onChange={municipalitiesChange}>
            {municipalitiesList === [] ? (
              ''
            ) : (
              municipalitiesList.map((municipalitie: Prefecture) => (
                <option key={municipalitie.id} value={municipalitie.id}>{municipalitie.name}</option>
              ))
            )
            }
          </Select>
        </FormControl>
        <FormControl id='review' isRequired>
          <FormLabel>??????</FormLabel>
          <Textarea
            name='review'
            value={review}
            onChange={reviewChange}
            placeholder="????????????"
          />
        </FormControl>
        <div className='arign-right'>
          <Button type='submit' colorScheme='orange'>
            ??????
          </Button>
        </div>
      </VStack>
    </Container>
  )
}