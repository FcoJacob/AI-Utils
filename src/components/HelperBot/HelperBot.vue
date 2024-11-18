<script setup lang="ts">
import { computed, onBeforeMount, ref, reactive, onBeforeUnmount, onMounted } from 'vue'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiClose, mdiSend } from '@mdi/js'
import FloatButton from './components/FloatButton.vue'
import BenderImage from './components/icons/BenderImage.vue'
import SpeechBubble from './components/SpeechBubble.vue'
import { type InitChatResponse, type Message, Role } from './components/types'
import { baseURL } from '@/composables/useSignalR'

type HelperBotProps = {
  /**
   * Title of the bot, how the want to be called
   */
  titleBot?: string
  /**
   * Title of the product that the bot is helping with
   */
  titleProduct?: string
  /**
   * If the chat has a close button
   */
  withCloseButton?: boolean
  /**
   * If the chat has an avatar
   */
  withAvatar?: boolean
}

withDefaults(defineProps<HelperBotProps>(), {
  titleBot: 'Helper AI',
  titleProduct: 'Product Name',
  chatId: 123456,
  withAvatar: true,
  withCloseButton: true,
})

const isChatOpen = ref(false)

const openChat = () => {
  isChatOpen.value = !isChatOpen.value
}

const registryChat: InitChatResponse = reactive({
  chatId: '',
  name: '',
  messages: [],
})

const messagesHistory: Message[] = reactive([])

const messageUser = ref('')

const getResponse = async () => {
  const actual = messagesHistory.length + 1
  messagesHistory.push({
    id: actual,
    sender: Role.Assistant,
    name: 'Assistant',
    text: messageUser.value,
    timestamp: new Date().toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }),
    loading: true,
  })
  try {
    await fetch(`${baseURL.value}/api/v1/chats/${registryChat.chatId}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: messageUser.value,
      }),
    }).then(async (response) => {
      const data = await response.json()
      const lastMessage: Message = messagesHistory.find((message) => message.id === actual)!
      lastMessage.loading = false
      lastMessage.text = data.message
    })
  } catch (error) {
    console.error(error)
  }
}

const sendMessage = async () => {
  messagesHistory.push({
    id: messagesHistory.length + 1,
    sender: Role.User,
    name: 'User',
    text: messageUser.value,
    timestamp: new Date().toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }),
  })
  await getResponse()
  messageUser.value = ''
}

const reverseOrderMessages = computed(() => {
  return messagesHistory.slice().reverse()
})

const registryChatBot = async () => {
  try {
    const response = await fetch(`${baseURL.value}/api/v1/chats?chatName=chatbot`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    registryChat.chatId = data.id
    registryChat.name = data.name
    registryChat.messages = data.messages
  } catch (error) {
    console.error(error)
  }
}

const copyURL = async (id: string) => {
  try {
    await navigator.clipboard.writeText(id)
    alert('id Copied')
  } catch (error) {
    console.log('Cannot copy', error)
  }
}

const setSessionStorage = () => {
  sessionStorage.setItem('chatId', registryChat.chatId)
}

onBeforeMount(async () => {
  await registryChatBot()
})

onMounted(() => {
  setSessionStorage()
})

onBeforeUnmount(() => {
  Object.assign(messagesHistory, [])
  // sessionStorage.removeItem('chatId')
})
</script>

<template>
  <float-button @click="openChat">
    <bender-image />
  </float-button>
  <div
    v-show="isChatOpen"
    role="dialog"
    aria-label="Dialog with bot of helper"
    class="ai-bg-white ai-fixed ai-bottom-4 ai-right-20 ai-rounded-3xl ai-overflow-hidden ai-flex ai-flex-col ai-justify-start ai-w-[400px] ai-shadow-lg"
  >
    <header class="ai-bg-indigo-950 ai-p-8 ai-w-full ai-text-white ai-flex ai-flex-col ai-gap-4">
      <div class="ai-w-full ai-grid ai-grid-cols-8">
        <h2 class="ai-text-lg ai-font-semibold ai-col-span-7">{{ titleBot }}</h2>
        <div class="ai-col-span-1 ai-flex ai-justify-end">
          <button v-if="withCloseButton" aria-label="Close chat button" @click="isChatOpen = false">
            <svg-icon type="mdi" :path="mdiClose" />
          </button>
        </div>
      </div>
      <div class="ai-flex ai-gap-4">
        <div v-if="withAvatar" class="ai-w-12 ai-aspect-square">
          <slot name="avatar" />
        </div>
        <div class="ai-flex ai-flex-col ai-justify-center ai-items-start ai-flex-grow ai-gap-0">
          <h4 class="ai-font-semibold ai-text-lg">{{ titleProduct }}</h4>
          <small class="ai-font-semibold">
            CHAT ID:
            <span class="ai-text-blue-300 ai-cursor-copy" @click="copyURL(registryChat.chatId)">
              {{ registryChat.chatId.split('-')[0].toUpperCase() }}</span
            >
          </small>
        </div>
      </div>
    </header>
    <main
      class="ai-chat-main ai-w-full ai-h-96 ai-flex ai-flex-col-reverse ai-gap-4 ai-overflow-y-auto ai-overflow-x-hidden ai-pl-6 ai-pr-2 ai-py-6"
    >
      <template v-for="message in reverseOrderMessages" :key="message.id">
        <speech-bubble
          :class="{
            'ai-self-end': message.sender === Role.User,
            'ai-self-start': message.sender === Role.Assistant,
          }"
          :message="message"
        />
      </template>
    </main>
    <footer class="ai-w-full ai-p-6 ai-flex ai-gap-2 ai-border-t ai-border-solid">
      <input
        type="text"
        aria-label="Enter your question for the bot"
        placeholder="Message ..."
        class="ai-flex-grow ai-p-2 ai-border ai-border-gray-300 ai-rounded-md ai-bg-gray-50"
        v-model="messageUser"
        @keyup.enter="sendMessage"
      />
      <button
        aria-label="Send message button"
        class="ai-w-10 ai-border ai-border-gray-300 ai-rounded-md ai-flex ai-justify-center ai-items-center ai-p-2"
        @click="sendMessage"
      >
        <svg-icon type="mdi" :path="mdiSend" class="ai-text-blue-400" />
      </button>
    </footer>
  </div>
</template>

<style scoped>
.ai-chat-main::-webkit-scrollbar {
  width: 20px; /* Scrollbar width */
}

.ai-chat-main::-webkit-scrollbar-track {
  background-color: transparent; /* Scrollbar track color */
}

.ai-chat-main::-webkit-scrollbar-thumb {
  background-color: #d6dee1;
  border-radius: 20px;
  border: 6px solid transparent;
  background-clip: content-box;
}

.ai-chat-main::-webkit-scrollbar-thumb:hover {
  background-color: #4a90e2;
}
</style>
