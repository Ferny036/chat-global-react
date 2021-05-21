import { IMessage } from '../../hook/useFirebaseMessageCollection'
import { firebase } from '../../services/Firebase'
import defaultUser from '../../assets/img/default.png'
import styles from './Message.module.css'

const Message = ({
  message,
  currentUser,
}: {
  message: IMessage
  currentUser: firebase.User | null | undefined
}) => {
  const isCurrentUserMessage = () => currentUser?.uid === message.uid

  return (
    <section
      className={isCurrentUserMessage() ? styles.uMessage : styles.message}
    >
      <img
        className={styles.img}
        src={message.photoURL || defaultUser}
        alt="user"
      />
      <main
        className={isCurrentUserMessage() ? styles.uContent : styles.content}
      >
        {message.text}
      </main>
    </section>
  )
}

export default Message
