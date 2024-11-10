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
      return { args }
    },
    template:
      '<helper-bot v-bind="args"><template #avatar><div class="w-full h-full bg-slate-200 rounded-full text-black flex justify-center items-center">IS</div></template></helper-bot>',
  }),
  args: {},
}
