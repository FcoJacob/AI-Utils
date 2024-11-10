<script setup lang="ts">
import { computed, ref } from 'vue'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiClose, mdiSend } from '@mdi/js'
import FloatButton from './components/FloatButton.vue'
import BenderImage from './components/icons/BenderImage.vue'
import SpeechBubble from './components/SpeechBubble.vue'
import { type Message, MessageType } from './components/types'

interface HelperBotProps {
  titleBot?: string
  titleProduct?: string
  chatId?: string
  withCloseButton?: boolean
  withAvatar?: boolean
  messages?: Message[]
}

const props = withDefaults(defineProps<HelperBotProps>(), {
  titleBot: 'Helper AI',
  titleProduct: 'Product Name',
  chatId: '123456',
  withAvatar: true,
  withCloseButton: true,
  messages: [
    {
      id: 1,
      sender: MessageType.System,
      name: 'Helper AI',
      text: 'Hello, how can I help you?',
      timestamp: new Date().toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }),
    },
    {
      id: 2,
      sender: MessageType.User,
      name: 'User',
      text: 'I need help with my order',
      timestamp: new Date().toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }),
    },
    {
      id: 3,
      sender: MessageType.System,
      name: 'Helper AI',
      text: 'Sure, what is your order number?',
      timestamp: new Date().toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }),
    },
    {
      id: 4,
      sender: MessageType.System,
      name: 'Helper AI',
      text: 'Sure, what is your order number?',
      timestamp: new Date().toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }),
    },
    {
      id: 5,
      sender: MessageType.System,
      name: 'Helper AI',
      text: 'Sure, what is your order number?',
      timestamp: new Date().toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }),
    },
    {
      id: 6,
      sender: MessageType.User,
      name: 'User',
      text: 'Sure, what is your order number? pcvsdbsd sd pjbsdv ipj sdvv sdvb pb sdvp vasdpb pvsd ipsdfv',
      timestamp: new Date().toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }),
    },
    {
      id: 7,
      sender: MessageType.System,
      name: 'Helper AI',
      text: 'Sure, what is your order number?',
      timestamp: new Date().toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }),
      loading: true,
    },
  ],
})

const emit = defineEmits<{
  (e: 'sendMessage', message: string): void
}>()

const isChatOpen = ref(false)

const openChat = () => {
  isChatOpen.value = !isChatOpen.value
}

const message = ref('')

const sendMessage = () => {
  emit('sendMessage', message.value)
  message.value = ''
}

const reverseOrderMessages = computed(() => {
  return props.messages.slice().reverse()
})
</script>

<template>
  <float-button @click="openChat">
    <bender-image />
  </float-button>
  <div
    v-if="isChatOpen"
    role="dialog"
    aria-label="Dialog with bot of helper"
    class="fixed bottom-4 right-20 rounded-3xl overflow-hidden flex flex-col justify-start w-[400px] shadow-lg"
  >
    <header class="bg-indigo-950 p-8 w-full text-white flex flex-col gap-4">
      <div class="w-full grid grid-cols-8">
        <h2 class="text-lg font-semibold col-span-7">{{ titleBot }}</h2>
        <div class="col-span-1 flex justify-end">
          <button v-if="withCloseButton" aria-label="Close chat button" @click="isChatOpen = false">
            <svg-icon type="mdi" :path="mdiClose" />
          </button>
        </div>
      </div>
      <div class="flex gap-4">
        <div v-if="withAvatar" class="w-12 aspect-square bg-amber-100">
          <slot name="avatar" />
        </div>
        <div class="flex flex-col justify-center items-start flex-grow gap-0">
          <h4 class="font-semibold text-lg">{{ titleProduct }}</h4>
          <small class="font-semibold">
            CHAT ID: <span class="text-blue-300 cursor-copy">{{ chatId }}</span>
          </small>
        </div>
      </div>
    </header>
    <main
      class="chat-main w-full h-96 flex flex-col-reverse gap-4 overflow-y-auto overflow-x-hidden pl-6 pr-2 py-6"
    >
      <template v-for="message in reverseOrderMessages" :key="message.id">
        <speech-bubble
          :class="{
            'self-end': message.sender === MessageType.User,
            'self-start': message.sender === MessageType.System,
          }"
          :message="message"
        />
      </template>
    </main>
    <footer class="w-full p-6 flex gap-2 border-t border-solid">
      <input
        type="text"
        aria-label="Enter your question for the bot"
        placeholder="Message ..."
        class="flex-grow p-2 border border-gray-300 rounded-md bg-gray-50"
        v-model="message"
        @keyup.enter="sendMessage"
      />
      <button
        aria-label="Send message button"
        class="w-10 border border-gray-300 rounded-md flex justify-center items-center p-2"
        @click="sendMessage"
      >
        <svg-icon type="mdi" :path="mdiSend" class="text-blue-400" />
      </button>
    </footer>
  </div>
</template>

<style scoped>
.chat-main::-webkit-scrollbar {
  width: 20px; /* Scrollbar width */
}

.chat-main::-webkit-scrollbar-track {
  background-color: transparent; /* Scrollbar track color */
}

.chat-main::-webkit-scrollbar-thumb {
  background-color: #d6dee1;
  border-radius: 20px;
  border: 6px solid transparent;
  background-clip: content-box;
}

.chat-main::-webkit-scrollbar-thumb:hover {
  background-color: #4a90e2;
}
</style>
