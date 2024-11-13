<script setup lang="ts">
import { type Message, Role } from './types'
import VueMarkdown from 'vue-markdown-render'
import MarkdownItAnchor from 'markdown-it-anchor'

interface SpeechBlueProps {
  message: Message
}

defineProps<SpeechBlueProps>()

const plugins = [MarkdownItAnchor]
</script>

<template>
  <div class="ai-flex ai-flex-col ai-gap-1">
    <div
      class="ai-uppercase ai-font-semibold ai-text-sm"
      :class="{
        'ai-self-end ai-mr-2': message.sender === Role.User,
        'ai-self-start ai-ml-2': message.sender === Role.Assistant,
      }"
    >
      {{ message.name }}
    </div>
    <div
      class="ai-speech-bubble"
      :class="{
        'ai-speech-bubble-user': message.sender === Role.User,
        'ai-speech-bubble-system': message.sender === Role.Assistant,
      }"
    >
      <template v-if="message.loading">
        <div class="ai-flex ai-justify-center ai-items-center ai-gap-1 ai-px-1 ai-py-1.5">
          <div class="ai-bg-blue-500 ai-h-1.5 ai-w-1.5 ai-rounded-full ai-animate-fade-1"></div>
          <div class="ai-bg-blue-500 ai-h-1.5 ai-w-1.5 ai-rounded-full ai-animate-fade-2"></div>
          <div class="ai-bg-blue-500 ai-h-1.5 ai-w-1.5 ai-rounded-full ai-animate-fade-3"></div>
        </div>
      </template>
      <template v-else>
        <vue-markdown :source="message.text" :plugins="plugins" />
      </template>
    </div>
    <small
      class="ai-text-gray-400 ai-font-semibold"
      :class="{
        'ai-self-end ai-mr-2': message.sender === Role.User,
        'ai-self-start ai-ml-2': message.sender === Role.Assistant,
      }"
    >
      {{ message.timestamp }}
    </small>
  </div>
</template>

<style scoped>
.ai-speech-bubble {
  @apply ai-w-fit ai-bg-slate-200 ai-py-2.5 ai-px-3 ai-rounded-lg ai-shadow-sm ai-relative ai-text-sm;
}

/* Punta para el mensaje del usuario */
.speech-bubble-user::after {
  content: '';
  position: absolute;
  top: 10px; /* Ajusta según la posición deseada */
  right: -16px; /* Ajusta según la posición deseada */
  width: 0;
  height: 0;
  border-width: 8px 8px 0 8px;
  border-style: solid;
  border-color: transparent transparent transparent #e2e8f0; /* Color del fondo del bocadillo */
}

/* Punta para el mensaje del sistema */
.speech-bubble-system::after {
  content: '';
  position: absolute;
  top: 10px; /* Ajusta según la posición deseada */
  left: -16px; /* Ajusta según la posición deseada */
  width: 0;
  height: 0;
  border-width: 8px 8px 0 8px;
  border-style: solid;
  border-color: transparent #e2e8f0 transparent transparent; /* Color del fondo del bocadillo */
}
</style>
