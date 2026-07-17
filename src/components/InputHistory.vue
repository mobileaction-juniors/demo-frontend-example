<script setup>
import {useInputHistoryStore} from "@/stores/InputHistory.js";

const inputHistoryStore = useInputHistoryStore()
</script>

<template>
  <div
      data-cy="input-history"
      class="flex flex-col gap-2"
  >
    <span class="text-sm font-semibold text-gray-600">History</span>
    <p v-if="!inputHistoryStore.entries.length" data-cy="input-history-empty" class="text-sm text-gray-500">
      No history yet. Generate keywords from the Keyword Generator page to see past inputs here.
    </p>
    <ul v-else class="flex max-h-48 flex-col gap-1 overflow-y-auto">
      <li v-for="entry in inputHistoryStore.entries" :key="entry.id">
        <button
            type="button"
            data-cy="input-history-item"
            @click="inputHistoryStore.selectEntry(entry.id)"
            class="w-full truncate rounded-md border px-3 py-2 text-left text-sm transition-colors"
            :class="entry.id === inputHistoryStore.activeEntry?.id
              ? 'border-blue-300 bg-blue-50 text-blue-700'
              : 'border-gray-100 bg-gray-50 text-gray-600 hover:bg-gray-100'"
        >
          {{ entry.input }}
        </button>
      </li>
    </ul>
  </div>
</template>
