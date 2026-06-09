<script setup>
import { computed, ref } from 'vue'
import { MaButton, MaTextarea } from '@mobileaction/action-kit'
import { cleanDescription } from '../utils/CleanDescription'

const props = defineProps({
  initialText: {
    type: String,
    default: ''
  }
})

//taking the text in the index page as the initial text for text input area.
const textInput = ref(props.initialText)
//initially submitted text is the same as the initial text. Dependent to change when button clicked.
const submittedText = ref(props.initialText)


// the function that calculates the keyword stats. 
function getKeywordStats(text) {
//cleaning the text by removing special chars and doing lowercase.
  const cleanedText = cleanDescription(text)//used from CleanDescription.js

//the case where there is no text after cleaning. returning empty arr.
  if (!cleanedText) {
    return []
  }

  //splitting the cleaned text into words. filtering empty strings.
  const words = cleanedText.split(' ').filter(Boolean)

  //no words case. returning empty arr.
  if (words.length === 0) {
    return []
  }

  // the variable that holds the count of each keyword created after splitting.
  const counts = {}

  //counting the occurences of each word.
  for (const word of words) {
    if (counts[word] === undefined) {
      counts[word] = 1
    } else {
      counts[word] = counts[word] + 1
    }
  }

  //total number of words.
  const totalWords = words.length

  //creating an array of objects with keyword, count and percentage.
  return Object.entries(counts)
    .map(([keyword, count]) => ({
      keyword,
      count,
      percentage: ((count / totalWords) * 100).toFixed(2)
    }))
    .sort((left, right) => right.count - left.count || left.keyword.localeCompare(right.keyword))
}

//the computed variable that holds the keyword stats table rows. It is dependent to the submitted text, so it will be recalculated when the submitted text changes.
const rows = computed(() => getKeywordStats(submittedText.value))

//the computed variable that holds the total number of words. Responsible from word count.
const totalWords = computed(() => rows.value.reduce((sum, row) => sum + row.count, 0))

// live word count for the textarea as the user types (uses cleaned text)
const liveWordCount = computed(() => {
  const cleaned = cleanDescription(textInput.value)
  if (!cleaned) return 0
  return cleaned.split(' ').filter(Boolean).length
})

function handleSubmit() {
  submittedText.value = textInput.value
}
</script>

<template>
  <section class="mx-auto w-full max-w-6xl px-4 py-8 md:px-6 lg:px-8">
    <header class="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p class="text-xs font-semibold uppercase tracking-[0.2em] text-sky-600">ONB-204</p>
      <h1 class="mt-2 text-2xl font-black tracking-tight text-slate-900 md:text-3xl">Keyword Percentage Review</h1>
      <p class="mt-2 text-sm text-slate-600 md:text-base">
        Edit text and submit to see each keyword count and percentage in the table.
      </p>
    </header>

    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <article class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <label for="density-source" class="text-sm font-semibold text-slate-800">Text</label>
            <span class="text-sm text-slate-500">{{ liveWordCount }} words</span>
          </div>
          <MaTextarea
            id="density-source"
            v-model="textInput"
            rows="14"
            placeholder="Type or paste your content here"
            class="w-full"
          />
          <MaButton
            :disabled="!textInput.trim()"
            class="inline-flex items-center justify-center rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-500 disabled:cursor-not-allowed disabled:opacity-50"
            @click="handleSubmit"
          >
            Analyze Keywords
          </MaButton>
        </div>
      </article>

      <article class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div class="mb-3 flex items-center justify-between gap-3">
          <h2 class="text-lg font-bold text-slate-900">Keyword Table</h2>
          <span class="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
            {{ totalWords }} total words
          </span>
        </div>

        <div class="max-w-full overflow-x-auto rounded-xl border border-slate-200">
          <table class="min-w-full text-left text-sm">
            <thead class="bg-slate-50 text-slate-700">
              <tr>
                <th class="px-4 py-3 font-semibold">Keyword</th>
                <th class="px-4 py-3 text-right font-semibold">Count</th>
                <th class="px-4 py-3 text-right font-semibold">Percentage</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="rows.length === 0">
                <td colspan="3" class="px-4 py-8 text-center text-slate-500">
                  Submit text to generate keyword stats.
                </td>
              </tr>
              <tr v-for="row in rows" :key="row.keyword" class="border-t border-slate-100">
                <td class="px-4 py-3 text-slate-800">{{ row.keyword }}</td>
                <td class="px-4 py-3 text-right text-slate-700">{{ row.count }}</td>
                <td class="px-4 py-3 text-right text-slate-700">{{ row.percentage }}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </article>
    </div>
  </section>
</template>
