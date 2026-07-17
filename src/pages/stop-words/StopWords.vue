<script setup>
import {ref} from "vue";
import {MaTextInput, MaButton} from "@mobileaction/action-kit";
import {useStopWordsStore} from "@/stores/StopWords.js";

const stopWordsStore = useStopWordsStore()
const newWord = ref('')

const handleAddWord = () => {
  stopWordsStore.addWord(newWord.value)
  newWord.value = ''
}
</script>

<template>
  <div
      class="mx-auto mt-8 flex w-full max-w-368 flex-col gap-5 rounded-xl border
      border-gray-100 bg-white p-6 shadow-sm"
  >
    <div class="border-b border-gray-200 pb-3">
      <span class="text-xl font-bold text-gray-800">Stop Words</span>
    </div>

    <form data-cy="stop-words-form" class="flex flex-wrap gap-2" @submit.prevent="handleAddWord">
      <MaTextInput
          data-cy="stop-words-input"
          v-model="newWord"
          placeholder="Add a stop word..."
          class="w-full max-w-64"
      />
      <MaButton data-cy="stop-words-add" htmlType="submit">
        Add
      </MaButton>
    </form>

    <ul data-cy="stop-words-list" class="flex flex-wrap gap-2">
      <li
          v-for="word in stopWordsStore.words"
          :key="word"
          data-cy="stop-words-item"
          class="flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-sm text-gray-700"
      >
        {{ word }}
        <button
            type="button"
            data-cy="stop-words-remove"
            :aria-label="`Remove ${word}`"
            class="text-gray-400 transition-colors hover:text-red-600"
            @click="stopWordsStore.removeWord(word)"
        >
          ×
        </button>
      </li>
    </ul>

    <p v-if="!stopWordsStore.words.length" data-cy="stop-words-empty" class="text-sm text-gray-500">
      No stop words left. Every word you type will now be kept during generation.
    </p>
  </div>
</template>
