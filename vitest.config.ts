/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import Vue from '@vitejs/plugin-vue'
import dsv from '@rollup/plugin-dsv'

export default defineConfig({
  plugins: [Vue(), dsv()],
  test: {
    globals: true,
    environment: 'jsdom',
  },
})
