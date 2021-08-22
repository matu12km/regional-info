import { Button, Container, Text, Input, VStack, FormControl, FormLabel, Select } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { addComment } from '../api/contentsApi'
import { useAuth } from '../contexts/authContext'
import { useContents } from '../contexts/contentsContext'
import { IContentAdd } from '../models'
import EditorJS from 'react-editor-js'
import { EDITOR_JS_TOOLS } from '../tool/richEditorTools'
import axios from 'axios'
import { Prefecture, PrefectureArray } from '../data/prefectures'

export const Editor = () => {
  const { user } = useAuth()
  const { dispatch } = useContents()
  const [contentType, setContentType] = useState('')
  const [searchPrefecture, setSearchPrefecture] = useState('')
  const [municipalitiesList, setMunicipalitiesList] = useState([])
  const [prefectures, setPrefectures] = useState('')
  const [dataPrefecture, setDataPrefecture] = useState('')
  const [municipalities, setMunicipalities] = useState('')
  const [dataMunicipalities, setDataMunicipalities] = useState('')
  const [title, setTitle] = useState('')
  const [contentData, setContentData] = useState([])
  
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
    if (contentData !== [] && user) {
      const toPost: IContentAdd = {
        user: { displayName: user.displayName, photoURL: user.photoURL },
        contentType,
        prefectures: dataPrefecture,
        municipalities: dataMunicipalities,
        title,
        content: contentData,
      }
      addComment({ ...toPost })
      dispatch({
        type: 'ADD_CONTENT',
        content: {
          ...toPost,
          createdAt: new Date(),
          id: Date(),
        },
      })
    } else if (!user) {
      alert('Sign in first')
    }
    setContentType('')
    setPrefectures('')
    setMunicipalities('')
    setTitle('')
    setContentData([])
    alert('Success')
  }
  const contentTypeChange = (e: React.FormEvent<HTMLSelectElement>) => {
    setContentType(e.currentTarget.value)
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
  const titleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }
  const handleEditorChanged = (api: any, newData: any) => {
    setContentData(newData)
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
        <FormControl id="contentType" isRequired>
          <div className='arign-right'>
            <Button type='submit' colorScheme='orange'>
              投稿
            </Button>
          </div>
          <FormLabel>投稿の種類</FormLabel>
          <Select placeholder="投稿の種類を選んでください。" value={contentType} onChange={contentTypeChange}>
            <option>活動紹介</option>
            <option>イベントの宣伝</option>
            <option>町の紹介</option>
          </Select>
        </FormControl>
        <FormControl id="prefectures" isRequired>
          <FormLabel>都道府県</FormLabel>
          <Select placeholder="都道府県を選んでください。" value={prefectures} onChange={prefecturesChange}>
            {PrefectureArray.map((prefecture: Prefecture) => (
              <option key={prefecture.id} value={prefecture.id}>{prefecture.name}</option>
            ))}
          </Select>
        </FormControl>
        <FormControl id="municipalities" isRequired>
          <FormLabel>市町村</FormLabel>
          <Select placeholder="市町村を選んでください。" value={municipalities} onChange={municipalitiesChange}>
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
        <FormControl id='title' isRequired>
          <FormLabel>タイトル</FormLabel>
          <Input value={title} onChange={titleChange} size='md' placeholder="投稿タイトル" />
        </FormControl>
        <FormControl id='content' isRequired>
          <FormLabel>記事</FormLabel>
          <EditorJS
            onChange={(api, newData) => handleEditorChanged(api, newData)}
            tools={EDITOR_JS_TOOLS}
            data={{
              time: Date.now(),
              blocks: contentData
          }} />
        </FormControl>
      </VStack>
    </Container>
  )
}