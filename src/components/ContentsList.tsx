import React, { useEffect } from 'react'
import {PostItem} from './PostItem'
import { IContent } from '../models'
import { getContents } from '../api/contentsApi'
import { useContents } from '../contexts/contentsContext'



export const ContentsList = () => {
  const {
    state: { contents },
    dispatch,
  } = useContents()
  useEffect(() => {
    getContents().then((data) => {
      dispatch({ type: 'SET_CONTENTS', contents: data })
    })
  }, [dispatch])
  return (
    <div className='article-list'>
      {contents.map((content: IContent) => (
        <PostItem key={content.id} content={content} />
      ))}
    </div>
  )
}