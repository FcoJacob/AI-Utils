import { type HubConnection, HubConnectionBuilder } from '@microsoft/signalr'

let connection: HubConnection
export const useSignalR = () => {
  const connect = (url: string) => {
    connection = new HubConnectionBuilder().withUrl(url).withAutomaticReconnect().build()
    connection.start().catch(() => {})
  }
  return {
    connection,
    connect,
  }
}
