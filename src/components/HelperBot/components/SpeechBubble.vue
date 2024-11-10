<script setup lang="ts">
import { type Message, MessageType } from './types'

interface SpeechBlueProps {
  message: Message
}

defineProps<SpeechBlueProps>()
</script>

<template>
  <div class="flex flex-col gap-1">
    <div
      class="uppercase font-semibold text-sm"
      :class="{
        'self-end mr-2': message.sender === MessageType.User,
        'self-start ml-2': message.sender === MessageType.System,
      }"
    >
      {{ message.name }}
    </div>
    <div
      class="speech-bubble"
      :class="{
        'speech-bubble-user': message.sender === MessageType.User,
        'speech-bubble-system': message.sender === MessageType.System,
      }"
    >
      <template v-if="message.loading">
        <div class="flex justify-center items-center gap-1 px-1 py-1.5">
          <div class="bg-blue-500 h-1.5 w-1.5 rounded-full animate-fade-1"></div>
          <div class="bg-blue-500 h-1.5 w-1.5 rounded-full animate-fade-2"></div>
          <div class="bg-blue-500 h-1.5 w-1.5 rounded-full animate-fade-3"></div>
        </div>
      </template>
      <template v-else>
        {{ message.text }}
      </template>
    </div>
    <small
      class="text-gray-400 font-semibold"
      :class="{
        'self-end mr-2': message.sender === MessageType.User,
        'self-start ml-2': message.sender === MessageType.System,
      }"
    >
      {{ message.timestamp }}
    </small>
  </div>
</template>

<style scoped>
.speech-bubble {
  @apply w-fit bg-slate-200 py-2.5 px-3 rounded-lg shadow-sm relative text-sm;
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
