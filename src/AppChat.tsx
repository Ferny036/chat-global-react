import { Channel } from './components/Layout/Channel'
import Login from './components/Layout/Login'
import { useUser } from './context/User'

export const AppChat = () => {
  const { user } = useUser()
  return <>{user ? <Channel /> : <Login />}</>
}
