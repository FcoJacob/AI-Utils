import { it, expect } from 'vitest'
import { render, screen } from '@testing-library/vue'
import HelperBot from './HelperBot.vue'
import { userEvent } from '@testing-library/user-event'
import { MessageType } from './components/types'

const messages = [
  {
    id: 1,
    sender: MessageType.System,
    name: 'Helper AI',
    text: 'Hello, how can I help you?',
    timestamp: new Date().toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }),
  },
  {
    id: 2,
    sender: MessageType.User,
    name: 'User',
    text: 'I need help with my order',
    timestamp: new Date().toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }),
  },
  {
    id: 3,
    sender: MessageType.System,
    name: 'Helper AI',
    text: 'Sure, what is your order number?',
    timestamp: new Date().toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }),
  },
  {
    id: 4,
    sender: MessageType.System,
    name: 'Helper AI',
    text: 'Sure, what is your order number?',
    timestamp: new Date().toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }),
  },
  {
    id: 5,
    sender: MessageType.System,
    name: 'Helper AI',
    text: 'Sure, what is your order number?',
    timestamp: new Date().toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }),
  },
  {
    id: 6,
    sender: MessageType.User,
    name: 'User',
    text: 'Sure, what is your order number? pcvsdbsd sd pjbsdv ipj sdvv sdvb pb sdvp vasdpb pvsd ipsdfv',
    timestamp: new Date().toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }),
  },
  {
    id: 7,
    sender: MessageType.System,
    name: 'Helper AI',
    text: 'Sure, what is your order number?',
    timestamp: new Date().toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }),
    loading: true,
  },
]

it('should render the HelperBot component', () => {
  render(HelperBot, { props: { messages } })

  expect(screen.getByRole('button', { name: 'Button for open/close the chat bot' })).toBeVisible()
})

it('should show a title for the chat', async () => {
  render(HelperBot, { props: { titleBot: 'Chat with me', messages } })

  await openChatBot()

  expect(screen.getByText('Chat with me')).toBeVisible()
})

it('should show a icon for closed the chat bot', async () => {
  render(HelperBot, { props: { messages } })

  await openChatBot()

  expect(screen.getByRole('button', { name: 'Close chat button' })).toBeVisible()
})

it('should close dialog when click on close button', async () => {
  render(HelperBot, { props: { messages } })
  await openChatBot()

  await clickButtonClose()

  expect(
    screen.queryByRole('dialog', { name: 'Dialog with bot of helper' }),
  ).not.toBeInTheDocument()
})

it('should show a avatar logo for the chat bot', async () => {
  render(HelperBot, {
    props: { messages },
    slots: { avatar: '<img src="" alt="Avatar logo for chat bot" />' },
  })

  await openChatBot()

  expect(screen.getByRole('img', { name: 'Avatar logo for chat bot' })).toBeVisible()
})

it('should show a title product for the chat bot', async () => {
  render(HelperBot, { props: { titleProduct: 'Product name', messages } })

  await openChatBot()

  expect(screen.getByText('Product name')).toBeVisible()
})

it('should show a chat id for the chat bot', async () => {
  render(HelperBot, { props: { chatId: 123456, messages } })

  await openChatBot()

  expect(screen.getByText('123456')).toBeVisible()
})

it('should show a input for user type a message', async () => {
  render(HelperBot, { props: { messages } })

  await openChatBot()

  expect(screen.getByRole('textbox', { name: 'Enter your question for the bot' })).toBeVisible()
})

it('should emit a message when the user type a message and push enter button', async () => {
  const { emitted } = render(HelperBot, { props: { messages } })
  await openChatBot()
  const input = await typeMessage('Hello, bot!')

  await userEvent.type(input, '{enter}')

  expect(emitted('sendMessage')[0]).toMatchObject(['Hello, bot!'])
})

it('should emit a message when the user type a message and clicks to the send button', async () => {
  const { emitted } = render(HelperBot, { props: { messages } })
  await openChatBot()
  await typeMessage('Hello, bot!')

  await clickButtonSend()

  expect(emitted('sendMessage')[0]).toMatchObject(['Hello, bot!'])
})

const openChatBot = async () => {
  const button = screen.getByRole('button', { name: 'Button for open/close the chat bot' })
  await userEvent.click(button)
}

const clickButtonClose = async () => {
  const button = screen.getByRole('button', { name: 'Close chat button' })
  await userEvent.click(button)
}

const typeMessage = async (message: string) => {
  const input = screen.getByRole('textbox', { name: 'Enter your question for the bot' })
  await userEvent.type(input, message)
  return input
}

const clickButtonSend = async () => {
  const button = screen.getByRole('button', { name: 'Send message button' })
  await userEvent.click(button)
}
