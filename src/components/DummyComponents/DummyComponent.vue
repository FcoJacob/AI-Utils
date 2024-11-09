<script setup lang="ts">
interface DummyComponentProps {
  /**
   * The text to display
   */
  text?: string
}

defineProps<DummyComponentProps>()
</script>

<template>
  <div class="text-lg font-bold">Hola, Dummy! {{ text }}</div>
</template>

<style scoped></style>
