import { firedb, firebase } from '../firebase'
import { IContent, IContentAdd } from '../models'

export const getContents = async () => {
  const snapShot = await firedb
    .collection('contents')
    
    .get()
  const data = snapShot.docs.map<IContent>((doc) => ({
    user: doc.data().user,
    contentType: doc.data().contentType,
    title: doc.data().title,
    content: doc.data().content,
    createdAt: doc.data().createdAt.toDate(),
    id: doc.id,
  }))
  return data
}

export const addComment = async (content: IContentAdd) => {
  return firedb.collection('contents').add({
    user: content.user,
    contentType: content.contentType,
    title: content.title,
    content: content.content,
    createdAt: firebase.firestore.Timestamp.now(),
  })
}
