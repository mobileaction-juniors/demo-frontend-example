<script setup>
import { ref, computed, defineExpose } from 'vue'
import ReviewTable from '@/components/molecules/review-table.vue'
import CharacterCounter from '@/components/molecules/CharacterCounter.vue'
import FormTextArea from '@/components/molecules/FormTextArea.vue'

const props = defineProps({ text: { type: String, default: '' } })

const input_text = ref(props.text)
const results = ref([])

const MIN_LEN = 2
const STOPWORDS = new Set([
  'a','an','and','or','the','to','of','in','on','for','with','at','by','is','it','as','be',
  'this','that','are','was','were','from','but','not','your','you'
])

function tokenize_clean(text) {
  if (!text) return []
  const words = text.toLowerCase().match(/[\p{L}\p{N}]+/gu) || []
  return words.filter(w => w.length >= MIN_LEN && !STOPWORDS.has(w))
}

const tokens = computed(() => tokenize_clean(input_text.value))

const freq_map = computed(() => {
  const m = new Map()
  for (const t of tokens.value) m.set(t, (m.get(t) || 0) + 1)
  return m
})

const computed_rows = computed(() => {
  const total = tokens.value.length
  const rows = Array.from(freq_map.value, ([keyword, count]) => ({
    keyword,
    count,
    percent: total ? (count / total) * 100 : 0
  }))
  rows.sort((a, b) => (b.count - a.count) || a.keyword.localeCompare(b.keyword))
  return rows
})

const total_tokens = computed(() => tokens.value.length)
const total_chars  = computed(() => input_text.value.length)

const analyze = () => {
  results.value = computed_rows.value
}

const reset_form = () => {
  input_text.value = ''
  results.value = []
}

defineExpose({ reset_form })
</script>

<template>
  <section class="p-4 max-w-7xl mx-auto w-full">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
      <div class="rounded-2xl border border-neutral-200 bg-white p-4">
        <form-text-area
          v-model="input_text"
          input-id="review-text"
          :rows="14"
          placeholder='Paste your text here and press "Count".'
        />
       <character-counter
          :total-chars="total_chars"
          @click:analyze="analyze"
          @click:reset="reset_form"
        />

      </div>

      <div>
        <review-table :items="results" :total="total_tokens" />
      </div>
    </div>
  </section>
</template>

<style scoped></style>
