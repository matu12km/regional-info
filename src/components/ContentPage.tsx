import { Header } from './Header'
import { Footer } from './Footer'
import { Container } from '@chakra-ui/layout'
import { getContent } from '../api/contentsApi'
import { useContents } from '../contexts/contentsContext'
import { useLayoutEffect , useState } from 'react'
import EditorJs from "react-editor-js";

import { EDITOR_JS_TOOLS } from '../tool/richEditorTools';
import { IContent } from '../models'

type Props = {
  match: {
    params: { postId: string }
  }
}

export const ContentPage: React.FC<Props> = ({ match }) => {
  const {
    state: { contents },
    dispatch,
  } = useContents()
  useLayoutEffect(() => {
    getContent(match.params.postId).then((List) => {
      dispatch({ type: 'SET_CONTENT', content: List })
    })
  }, [dispatch, match.params.postId])
  return (
    <>
      <Header />
      <Container px={2} maxW='container.lg'>
        {contents.length > 0 ? (contents.map((content: IContent) => (
          <EditorJs
            tools={EDITOR_JS_TOOLS}
            i18n={{
              messages: {},
            }}
            readOnly={true}
            data={contents[0]['content']}
          />
        ))) : <p>NotData</p>}
      </Container>
      <Footer />
    </>
  )
}