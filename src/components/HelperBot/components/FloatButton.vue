<script setup lang="ts">
const emit = defineEmits<{
  (e: 'click'): void
}>()
</script>

<template>
  <button class="chat-icon" aria-label="Button for open/close the chat bot" @click="emit('click')">
    <slot />
  </button>
</template>

<style scoped>
.chat-icon {
  @apply fixed bottom-4 right-4 w-12 h-12 bg-blue-500 rounded-full flex justify-center items-center cursor-pointer shadow-md;
}
</style>
