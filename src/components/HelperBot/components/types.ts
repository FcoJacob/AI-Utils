export enum MessageType {
  System,
  User,
}

export type Message = {
  id: number
  sender: MessageType
  name: string
  text: string
  timestamp: Date | string
  loading?: boolean
}
