import { DummyComponent } from '@/components'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta<typeof DummyComponent> = {
  title: 'Components/Utils/DummyComponent',
  component: DummyComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Esto es un simple componente para la configuración del proyecto. <a href="#">Aquí para ver mas...</a>',
      },
    },
    design: {
      type: 'figma',
      url: '',
    },
  },
}
export default meta

type Story = StoryObj<typeof DummyComponent>

export const Default: Story = {
  render: (args) => ({
    component: { DummyComponent },
    setup() {
      return { args }
    },
    template: `
      <div class="w-full h-full flex justify-center items-center">
        <dummy-component
          :text="args.text"
        />
      </div>
    `,
  }),
  args: {
    text: 'A Dummy Component',
  },
}
