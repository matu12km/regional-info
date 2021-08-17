import { Box, Input, Select, Button, Center, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { IReview } from '../models'

export const ReviewSerchBox = (dataList: Array<IReview>) => {
  const [prefectures, setPrefectures] = useState('')
  const [attribute, setAttribute] = useState('')
  const [freeWord, setFreeWord] = useState('')
  const prefecturesChange = (e: React.FormEvent<HTMLSelectElement>) => {
    setPrefectures(e.currentTarget.value)
  }
  const attributeChange = (e: React.FormEvent<HTMLSelectElement>) => {
    setAttribute(e.currentTarget.value)
  }
  const freeWordChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFreeWord(e.currentTarget.value)
  }
  const handleClick = (e: React.FormEvent) => {
    if (prefectures !== '') {
      dataList.filter(value => value.prefectures === prefectures)
    }
    if (attribute !== '') {
      dataList.filter(value => value.attribute === attribute)
    }
    if (freeWord !== '') {
      dataList.filter(value => value.review.match(freeWord))
    }
  }
  return(
  <>
    <Box w={'full'} m={2} p={3} bg={'white'}>
      <Text>詳細検索</Text>
      <Text>都道府県から探す</Text>
      <Select value={prefectures || ''} onChange={prefecturesChange}>
        <option>〇〇県</option>
        <option>〇×県</option>
        <option>□△県</option>
      </Select>
      <Text>属性から探す</Text>
      <Select value={attribute || ''} onChange={attributeChange}>
        <option>地域活動団体</option>
        <option>個人(協力隊等)</option>
        <option>その他</option>
      </Select>
      <Text >キーワード検索</Text>
      <Input value={freeWord || ''} onChange={freeWordChange} />
      <Center mt={2}>
      <Button colorScheme='bule' onClick={handleClick}>検索</Button>
      </Center>


    </Box>
    </>
  )
}