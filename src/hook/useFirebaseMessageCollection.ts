import { useCollectionData } from 'react-firebase-hooks/firestore'
import { firebase, firestore } from '../services/Firebase'

export interface IMessage {
  id: string
  text: string
  uid: string
  photoURL: string
  displayName: string
  createdAt: firebase.firestore.Timestamp
}

const useMessageFirebaseCollection = (
  user: firebase.User | null | undefined
) => {
  const messagesRef = firestore.collection('messages')
  const messagesQuery = messagesRef.orderBy('createdAt', 'desc').limit(100)
  const [messages, loading, error] = useCollectionData<IMessage>(
    messagesQuery,
    { idField: 'id' }
  )

  const setNewMessage = (text: string) => {
    if (user) {
      const { displayName, photoURL, uid } = user
      messagesRef.add({
        text,
        uid,
        photoURL,
        displayName,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
    }
  }

  return { messages, loading, error, setNewMessage }
}

export default useMessageFirebaseCollection
