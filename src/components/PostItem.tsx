import React from 'react'
import { IContent } from '../models'
import { useHistory } from 'react-router-dom'

type Props = {
  content: IContent
}

export const PostItem: React.FC<Props> = ({ content }: { content: IContent }) => {
  const history= useHistory()

  const onclickPage =() => history.push(`/contents/${content.id}`)

  return (
    <div className='card'>
      

      <div className='title'>
        <button onClick={onclickPage} >
          {content.title.slice(0, 80)}
        </button>
      </div>
    </div>
  )
}