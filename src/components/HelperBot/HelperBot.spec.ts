import { it, expect } from 'vitest'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/vue'
import HelperBot from './HelperBot.vue'

it('should render the HelperBot component', () => {
  render(HelperBot)

  expect(screen.getByText('HelperBot')).toBeVisible()
})
