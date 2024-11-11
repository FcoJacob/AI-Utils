import './styles.css'
import { useSignalR } from './composables/useSignalR'

export * from './components'
export * from './components/types'

export const initConnectionBot = () => {
  const { connect } = useSignalR()
  connect('https://localhost:5001/hubs/chat')
}
