import { SyntheticEvent, useEffect, useRef, useState } from 'react'
import { useUser } from '../../context/User'
import Button from '../UI/Button'
import styles from './Channel.module.css'
import stylesBtn from '../UI/Button.module.css'
import useMessageFirebaseCollection from '../../hook/useFirebaseMessageCollection'
import Message from '../Elements/Message'

export const Channel = () => {
  const [text, setText] = useState('')
  const { logout, user } = useUser()
  const { messages, setNewMessage } = useMessageFirebaseCollection(user)
  const messageEnd = useRef<HTMLDivElement>(null)

  const sendMessage = (e: SyntheticEvent) => {
    e.preventDefault()
    setNewMessage(text)
    setText('')
  }

  useEffect(() => {
    const scrollToBottom = () => {
      messageEnd.current?.scrollIntoView({ behavior: 'smooth' })
    }
    scrollToBottom()
  }, [messages])

  return (
    <div className={styles.container}>
      <section className={styles.top}>
        <h1 className={styles.title}>We chat!</h1>
        <Button
          className={
            stylesBtn.btn + ' ' + stylesBtn.btn_aux + ' ' + styles.logoutBtn
          }
          onClick={logout}
        >
          <i className={'fas fa-door-open ' + styles.icon}></i>
        </Button>
      </section>
      <section className={styles.chat}>
        {messages &&
          messages
            .map((m) => <Message key={m.id} message={m} currentUser={user} />)
            .reverse()}
        <div style={{ float: 'left', clear: 'both' }} ref={messageEnd}></div>
      </section>
      <main className={styles.form_container}>
        <form className={styles.form_group} onSubmit={sendMessage}>
          <input
            className={styles.input}
            placeholder="Type Something..."
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></input>
          <Button
            className={
              styles.form_button + ' ' + stylesBtn.btn + ' ' + stylesBtn.btn_aux
            }
          >
            <i className={'fas fa-paper-plane ' + styles.icon}></i>
          </Button>
        </form>
      </main>
    </div>
  )
}
