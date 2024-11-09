import type { Preview } from '@storybook/vue3'

import './../src/styles.css'
import './assets/css/storybook.css'
import './assets/fonts/fonts.css'

const preview: Preview = {
  parameters: {
    docs: {
      story: { inline: false, iframeHeight: 150 },
    },
    options: {
      storySort: {
        order: ['Welcome', ['Intro'], 'Components', ['Utils']],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    decorators: [
      (story) => ({
        components: { story },
        template: '<body> <story /> </body>',
      }),
    ],
    tags: ['autodocs'],
  },
}

export default preview
