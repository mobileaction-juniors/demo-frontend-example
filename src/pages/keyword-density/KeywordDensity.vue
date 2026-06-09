<script setup>
import { ref } from 'vue'
import { MaInput, MaButton } from '@mobileaction/action-kit'

const props = defineProps({
  initialText: {
    type: String,
    default: ''
  }
})

const text = ref(props.initialText)
const results = ref([])
const totalChars = ref(0)

function countKeywords() {
  const words = text.value
    .toLowerCase()
    .replace(/[^a-z\s]/g, '')
    .split(/\s+/)
    .filter(w => w !== '')

  totalChars.value = text.value.length

  const map = new Map()
  for (const word of words) {
    if (map.has(word)) {
      map.set(word, map.get(word) + 1)
    } else {
      map.set(word, 1)
    }
  }

  results.value = Array.from(map.entries())
    .map(([keyword, count]) => ({
      keyword,
      count,
      density: ((count / words.length) * 100).toFixed(2)
    }))
    .sort((a, b) => b.count - a.count)
}

function copyToClipboard() {
  const content = results.value
    .map(r => `${r.keyword}: ${r.count} (${r.density}%)`)
    .join('\n')
  navigator.clipboard.writeText(content)
}
</script>

<template>
  <main class="p-6 max-w-6xl mx-auto">
    <h1 class="text-2xl font-bold mb-6">Keyword Density</h1>

    <div class="flex flex-col lg:flex-row gap-6">

      <!-- SOL: textarea + buton -->
      <div class="flex flex-col gap-3 lg:w-1/2">
        <MaInput
          v-model:value="text"
          type="textarea"
          placeholder="Enter text..."
          class="w-full"
          style="height: 300px"
        />
        <div class="flex items-center gap-4">
          <MaButton color="red" @click="countKeywords">Count</MaButton>
          <span class="text-sm text-gray-600">Total characters: <strong>{{ totalChars }}</strong></span>
        </div>
      </div>

      <!-- SAĞ: tablo -->
      <div class="flex flex-col gap-3 lg:w-1/2">
        <table v-if="results.length" class="w-full border-collapse text-sm">
          <thead>
            <tr class="bg-blue-600 text-white">
              <th class="text-left px-4 py-2">Keyword</th>
              <th class="px-4 py-2">Count</th>
              <th class="px-4 py-2">Density</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(row, index) in results"
              :key="row.keyword"
              :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'"
              class="border-b border-gray-100"
            >
              <td class="px-4 py-2">{{ row.keyword }}</td>
              <td class="px-4 py-2 text-center">{{ row.count }}</td>
              <td class="px-4 py-2 text-center">{{ row.density }}%</td>
            </tr>
          </tbody>
        </table>
        <MaButton @click="copyToClipboard">Copy to clipboard</MaButton>
      </div>

    </div>
  </main>
</template>
