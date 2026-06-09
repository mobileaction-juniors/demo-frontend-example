<script setup>
import { ref, computed } from 'vue'
import { MaButton, MaInput } from '@mobileaction/action-kit'
import { filterArr } from '../../cleanupResources'

const text = ref('')
const selectedNgrams = ref([])
const nGrams = ref([])

const options = Array.from({ length: 10 }, (_, i) => ({
  label: `${i + 1}-gram`,
  value: i + 1
}))

const stopwordOptions = filterArr
const showAllStopwords = ref(false)
const visibleStopwords = computed(() => showAllStopwords.value ? stopwordOptions : stopwordOptions.slice(0, 10))
const selectedStopwords = ref([])
const customStopword = ref('')

function addStopword() {
  const word = customStopword.value.trim().toLowerCase()
  if (word && !selectedStopwords.value.includes(word)) {
    selectedStopwords.value.push(word)
  }
  customStopword.value = ''
}

function removeStopword(word) {
  selectedStopwords.value = selectedStopwords.value.filter(item => item !== word)
}

function removeStopwords(inputText) {
  const stopwords = new Set(selectedStopwords.value)
  return inputText
    .split(/\s+/)
    .filter(word => !stopwords.has(word.toLowerCase().replace(/[^a-z]/g, '')))
    .join(' ')
}

function generateKeywords() {
  const words = removeStopwords(text.value)
    .toLowerCase()
    .replace(/[^a-z\s]/g, '')
    .split(' ')
    .filter(w => w !== '')

  nGrams.value = selectedNgrams.value.map(n => {
    const set = new Set()
    for (let i = 0; i <= words.length - n; i++) {
      set.add(words.slice(i, i + n).join(' '))
    }
    return { n, keywords: [...set] }
  })
}
</script>

<template>
  <main class="min-h-[calc(100vh-64px)] bg-slate-50 px-4 py-10 sm:px-6">
    <section class="mx-auto max-w-5xl">
      <div class="mb-8">
        <span class="mb-3 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700">
          Keyword tools
        </span>
        <h1 class="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Keyword Generator
        </h1>
        <p class="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
          Turn any text into focused keyword groups with custom n-grams and excluded words.
        </p>
      </div>

      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <div class="grid gap-7 lg:grid-cols-[minmax(0,1fr)_220px]">
          <div>
            <label class="mb-2 block text-sm font-semibold text-slate-800">Text to analyze</label>
            <MaInput
              v-model:value="text"
              type="textarea"
              placeholder="Enter a text to generate keywords."
              class="w-full"
            />
          </div>

          <div>
            <p class="mb-3 text-sm font-semibold text-slate-800">N-gram sizes</p>
            <div class="grid grid-cols-2 gap-2 lg:grid-cols-1">
              <label
                v-for="opt in options"
                :key="opt.value"
                class="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 transition hover:border-blue-300 hover:bg-blue-50"
              >
                <input
                  v-model="selectedNgrams"
                  type="checkbox"
                  :value="opt.value"
                  class="size-4 accent-blue-600"
                />
                {{ opt.label }}
              </label>
            </div>
          </div>
        </div>

        <div class="mt-7 border-t border-slate-100 pt-6">
          <p class="mb-3 text-sm font-semibold text-slate-800">Exclude words</p>
          <div class="flex flex-wrap gap-2">
            <label
              v-for="word in visibleStopwords"
              :key="word"
              class="flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 px-3 py-1.5 text-sm text-slate-600 transition hover:border-blue-300"
            >
              <input
                v-model="selectedStopwords"
                type="checkbox"
                :value="word"
                class="size-4 accent-blue-600"
              />
              {{ word }}
            </label>
          </div>
          <button
            class="mt-2 text-xs font-semibold text-blue-600 hover:underline"
            @click="showAllStopwords = !showAllStopwords"
          >
            {{ showAllStopwords ? 'Show less' : 'Show more' }}
          </button>

          <div class="mt-4 flex max-w-sm gap-2">
            <input
              v-model="customStopword"
              class="min-w-0 flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              placeholder="Add another word"
              @keyup.enter="addStopword"
            />
            <button
              class="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              @click="addStopword"
            >
              Add
            </button>
          </div>

          <div v-if="selectedStopwords.length" class="mt-3 flex flex-wrap gap-2">
            <button
              v-for="word in selectedStopwords"
              :key="word"
              class="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 transition hover:bg-red-50 hover:text-red-700"
              title="Remove excluded word"
              @click="removeStopword(word)"
            >
              {{ word }} ×
            </button>
          </div>
        </div>

        <div class="mt-7 flex justify-end border-t border-slate-100 pt-6">
          <MaButton
            color="blue"
            size="large"
            icon="ai-sparkle"
            :disabled="!text.trim() || !selectedNgrams.length"
            @click="generateKeywords"
          >
            Generate keywords
          </MaButton>
        </div>
      </div>

      <div v-if="nGrams.length" class="mt-6 space-y-4">
        <article
          v-for="nGram in nGrams"
          :key="nGram.n"
          class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <div class="mb-4 flex items-center justify-between">
            <h2 class="text-sm font-bold text-slate-800">{{ nGram.n }}-gram keywords</h2>
            <span class="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
              {{ nGram.keywords.length }}
            </span>
          </div>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="keyword in nGram.keywords"
              :key="keyword"
              class="rounded-lg border border-blue-100 bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-800"
            >
              {{ keyword }}
            </span>
          </div>
        </article>
      </div>
    </section>
  </main>
</template>
