<script setup>
import { defineProps } from 'vue'
import { MaButton } from '@mobileaction/action-kit'
import '@mobileaction/action-kit/dist/style.css'
const props = defineProps({
  totalChars: { type: Number, required: true },
  onAnalyze: { type: Function, required: true },
  onReset: { type: Function, required: true }
})
</script>

<template>
  <div class="mt-4 flex items-center justify-between">
    <div class="flex items-center gap-3">
      <ma-button color="red" @click="onAnalyze">Count</ma-button>
      <ma-button color="gray" @click="onReset">Reset</ma-button>
    </div>
    <span class="text-base font-medium text-neutral-700">
      Total characters: <span class="font-bold">{{ totalChars }}</span>
    </span>
  </div>
</template>
