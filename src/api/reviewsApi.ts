import { firedb, firebase } from '../firebase'
import { IReview, IReviewAdd } from '../models'

export const getReviews = async () => {
  const snapShot = await firedb
    .collection('reviews')
    .get()
  const data = snapShot.docs.map<IReview>((doc) => ({
    user: doc.data().user,
    attribute: doc.data().attribute,
    prefectures: doc.data().prefectures,
    municipalities: doc.data().municipalities,
    review: doc.data().review,
    createdAt: doc.data().createdAt.toDate(),
    id: doc.id,
  }))
  return data
}

export const addReview = async (review: IReviewAdd) => {
  return firedb.collection('reviews').add({
    user: review.user,
    attribute: review.attribute,
    prefectures: review.prefectures,
    municipalities: review.municipalities,
    review: review.review,
    createdAt: firebase.firestore.Timestamp.now(),
  })
}
