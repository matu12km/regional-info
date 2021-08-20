import { Button, Container, Text, Input, Textarea, VStack, FormControl, FormLabel, Select } from '@chakra-ui/react'
import { useState } from 'react'
import { addComment } from '../api/contentsApi'
import { useAuth } from '../contexts/authContext'
import { useContents } from '../contexts/contentsContext'
import { IContentAdd } from '../models'

export const Editor = () => {
  const { user } = useAuth()
  const { dispatch } = useContents()
  const [contentType, setContentType] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (content !== '' && user) {
      const toPost: IContentAdd = {
        user: { displayName: user.displayName, photoURL: user.photoURL },
        contentType,
        title,
        content,
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
    setTitle('')
    setContent('')
    alert('Success')
  }
  const contentTypeChange = (e: React.FormEvent<HTMLSelectElement>) => {
    setContentType(e.currentTarget.value)
  }
  const titleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }
  const handleChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setContent(e.currentTarget.value)
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
          <FormLabel>投稿の種類</FormLabel>
          <Select placeholder="投稿の種類を選んでください。" value={contentType} onChange={contentTypeChange}>
            <option>活動紹介</option>
            <option>イベントの宣伝</option>
            <option>町の紹介</option>
          </Select>
        </FormControl>
        <FormControl id='title' isRequired>
          <FormLabel>タイトル</FormLabel>
          <Input value={title} onChange={titleChange} size='md' placeholder="投稿タイトル" />
        </FormControl>
        <FormControl id='content' isRequired>
          <FormLabel>内容</FormLabel>
          <Textarea
            name='content'
            value={content}
            onChange={handleChange}
            placeholder="投稿内容"
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