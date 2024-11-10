import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/vue'
import { afterEach } from 'vitest'

global.CSS = {
  supports: (): boolean => false,
  escape: (str: string): string => str,
} as unknown as typeof CSS

afterEach(cleanup)
