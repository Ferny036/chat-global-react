import { useUser } from '../../context/User'
import styles from './Login.module.css'
import stylesBtn from '../UI/Button.module.css'
import Button from '../UI/Button'
import image from '../../assets/img/presentation-img.png'
import googleImage from '../../assets/img/google_image.png'

const Login = () => {
  const { login } = useUser()
  return (
    <section className={styles.container}>
      <h1 className={styles.title}>We Chat!</h1>
      <h3 className={styles.subtitle}>Let's go to chat!</h3>
      <main className={styles.image_container}>
        <img className={styles.image} src={image} alt="presentation" />
      </main>
      <Button
        className={stylesBtn.btn + ' ' + stylesBtn.btn_primary}
        onClick={login}
      >
        <img className={stylesBtn.image} src={googleImage} alt="google logo" />
        Login with google
      </Button>
    </section>
  )
}

export default Login
