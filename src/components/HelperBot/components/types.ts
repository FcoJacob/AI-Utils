export enum Role {
  Assistant,
  User,
}

export type Message = {
  id: number
  sender: Role
  name: string
  text: string
  timestamp: Date | string
  loading?: boolean
}

export type MessageResponse = {
  role: Role
  message: string
  date: Date | string
}

export type InitChatResponse = {
  guid: string
  name: string
  messages: MessageResponse[] | []
}
