<script setup>
import { ref, computed, defineExpose } from 'vue'
import { MaForm, MaInput, MaButton } from '@mobileaction/action-kit'
import '@mobileaction/action-kit/dist/style.css'
import ReviewTable from '@/components/molecules/review-table.vue'
import CharacterCounter from '@/components/molecules/CharacterCounter.vue'
import FormTextArea from '@/components/molecules/FormTextArea.vue'

const props = defineProps({ text: { type: String, default: '' } })

const input_text = ref(props.text)
const results = ref([])

const total_tokens = computed(() => tokenize(input_text.value).length)
const total_chars = computed(() => input_text.value.length)

function tokenize(str) {
  if (!str) return []
  const m = str.toLowerCase().match(/[\p{L}\p{N}]+/gu)
  return (m || []).filter(w => w.length > 1)
}

function analyze() {
  const toks = tokenize(input_text.value)
  const total = toks.length
  const map = new Map()
  for (const t of toks) map.set(t, (map.get(t) || 0) + 1)
  const arr = Array.from(map.entries()).map(([k, c]) => ({
    keyword: k,
    count: c,
    percent: total ? (c / total) * 100 : 0
  }))
  arr.sort((a, b) => (b.count - a.count) || a.keyword.localeCompare(b.keyword))
  results.value = arr
}

function reset_form() {
  input_text.value = ''
  results.value = []
}

defineExpose({ reset_form })
</script>

<template>
  <section class="p-4 max-w-7xl mx-auto w-full">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
      <div class="rounded-2xl border border-neutral-200 bg-white p-4">
         <FormTextArea
          v-model="input_text"
          input-id="review-text"
          :rows="14"
          placeholder='Paste your text here and press "Count".'
        />

       <CharacterCounter
        :totalChars="total_chars"
        :onAnalyze="analyze"
        :onReset="reset_form"
       />
      </div>

      <div>
        <review-table :items="results" :total="total_tokens" />
      </div>
    </div>
  </section>
</template>

<style scoped></style>
