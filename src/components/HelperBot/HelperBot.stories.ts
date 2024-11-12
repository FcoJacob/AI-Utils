import type { Meta, StoryObj } from '@storybook/vue3'
import { action } from '@storybook/addon-actions'
import HelperBot from './HelperBot.vue'
import { Role } from '@/components/HelperBot/components/types'

const meta: Meta<typeof HelperBot> = {
  title: 'Components/Utils/HelperBot',
  component: HelperBot,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'This component represents the main chat interface for an AI chat assistant. It includes a header, a chat body to display messages, and a footer for user input and interaction.',
      },
    },
    design: {
      type: 'figma',
      url: '',
    },
  },
}
export default meta

type Story = StoryObj<typeof HelperBot>

export const Default: Story = {
  render: (args) => ({
    components: { HelperBot },
    setup() {
      return {
        args,
        sendMessage: action('sendMessage'),
      }
    },
    template: `<helper-bot
        :title-bot="args.titleBot"
        :title-product="args.titleProduct"
        :chat-id="args.chatId"
        :with-close-button="args.withCloseButton"
        :with-avatar="args.withAvatar"
        :messages="args.messages"
        @send-message="sendMessage"
      >
        <template #avatar>
          <div class="ai-w-full ai-h-full ai-bg-slate-200 ai-rounded-full ai-text-black ai-flex ai-justify-center ai-items-center">IS</div>
        </template>
      </helper-bot>`,
  }),
  args: {
    titleBot: 'Helper Bot',
    titleProduct: 'Sima Suite',
    chatId: 123456,
    withCloseButton: true,
    withAvatar: true,
    messages: [
      {
        id: 1,
        sender: Role.Assistant,
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
        sender: Role.User,
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
        sender: Role.Assistant,
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
        sender: Role.Assistant,
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
        sender: Role.Assistant,
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
        sender: Role.User,
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
        sender: Role.Assistant,
        name: 'Helper AI',
        text: 'Sure, what is your order number?',
        timestamp: new Date().toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }),
        loading: true,
      },
    ],
  },
}
