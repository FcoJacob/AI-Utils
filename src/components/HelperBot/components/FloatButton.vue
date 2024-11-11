<script setup lang="ts">
const emit = defineEmits<{
  (e: 'click'): void
}>()
</script>

<template>
  <button
    class="ai-chat-icon"
    aria-label="Button for open/close the chat bot"
    @click="emit('click')"
  >
    <slot />
  </button>
</template>

<style scoped>
.ai-chat-icon {
  @apply ai-fixed ai-bottom-4 ai-right-4 ai-w-12 ai-h-12 ai-bg-blue-500 ai-rounded-full ai-flex ai-justify-center ai-items-center ai-cursor-pointer ai-shadow-md;
}
</style>
