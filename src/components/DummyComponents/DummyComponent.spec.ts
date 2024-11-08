import { it, expect } from 'vitest'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/vue'
import DummyComponent from './DummyComponent.vue'

it('should show a text', () => {
  render(DummyComponent)

  expect(screen.getByText('Hola, Dummy!')).toBeInTheDocument()
})
