import type { Meta, StoryObj } from '@storybook/vue3'
import HelperBot from './HelperBot.vue'

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
      }
    },
    template: `<helper-bot
        :title-bot="args.titleBot"
        :title-product="args.titleProduct"
        :chat-id="args.chatId"
        :with-close-button="args.withCloseButton"
        :with-avatar="args.withAvatar"
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
  },
}
