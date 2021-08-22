import { firedb, firebase } from '../firebase'
import { IContent, IContentAdd } from '../models'

export const getContents = async () => {
  const snapShot = await firedb
    .collection('testcontents')
    .get()
  const data = snapShot.docs.map<IContent>((doc) => ({
    user: doc.data().user,
    contentType: doc.data().contentType,
    prefectures: doc.data().prefectures,
    municipalities: doc.data().municipalities,
    title: doc.data().title,
    content: doc.data().content,
    createdAt: doc.data().createdAt.toDate(),
    id: doc.id,
  }))
  return data
}

export const addComment = async (content: IContentAdd) => {
  return firedb.collection('testcontents').add({
    user: content.user,
    contentType: content.contentType,
    prefectures: content.prefectures,
    municipalities: content.municipalities,
    title: content.title,
    content: content.content,
    createdAt: firebase.firestore.Timestamp.now(),
  })
}
