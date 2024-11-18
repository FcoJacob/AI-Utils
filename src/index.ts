import './styles.css'
import { baseURL } from '@/composables/useSignalR'

export * from './components'
export * from './components/types'

export const setBaseURL = (newBaseURL: string) => {
  baseURL.value = newBaseURL || 'http://localhost:5000'
}
