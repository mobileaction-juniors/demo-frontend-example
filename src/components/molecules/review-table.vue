<script setup>
import { computed } from 'vue'

const props = defineProps({
  items: { type: Array, default: () => [] },
  total: { type: Number, default: 0 }
})

const grouped_rows = computed(() => {
  const groups = new Map()
  for (const r of props.items) {
    const k = r.count
    if (!groups.has(k)) groups.set(k, [])
    groups.get(k).push(r.keyword)
  }
  const rows = Array.from(groups.entries()).map(([count, list]) => ({
    keywords_csv: list.sort((a, b) => a.localeCompare(b)).join(', '),
    count,
    density: props.total ? (count / props.total) * 100 : 0
  }))
  rows.sort((a, b) => (b.count - a.count) || a.keywords_csv.localeCompare(b.keywords_csv))
  return rows
})

const all_keywords_csv = computed(() =>
  grouped_rows.value.map(r => r.keywords_csv).join(', ')
)

function copyCsv() {
  navigator.clipboard?.writeText(all_keywords_csv.value)
}
</script>

<template>
  <div class="w-full">
    <div class="w-full overflow-x-auto rounded-xl border border-neutral-200">
      <table class="min-w-full">
        <thead>
          <tr class="bg-indigo-600 text-white">
            <th class="text-left px-4 py-3">Keyword</th>
            <th class="text-right px-4 py-3">Count</th>
            <th class="text-right px-4 py-3">Density</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="!grouped_rows.length" class="bg-white">
            <td colspan="3" class="px-4 py-4 text-neutral-500">Enter text and press Count.</td>
          </tr>
          <tr v-for="row in grouped_rows" :key="row.keywords_csv" class="odd:bg-white even:bg-neutral-50">
            <td class="px-4 py-3 break-words max-w-[60vw]">{{ row.keywords_csv }}</td>
            <td class="px-4 py-3 text-right">{{ row.count }}</td>
            <td class="px-4 py-3 text-right">{{ row.density.toFixed(1) }}%</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="grouped_rows.length" class="mt-3">
      <div class="w-full rounded-xl bg-neutral-100 px-4 py-3 text-neutral-700">
        {{ all_keywords_csv }}
      </div>
      <div class="mt-3">
        <button
          type="button"
          @click="copyCsv"
          class="rounded-lg border border-indigo-200 px-4 py-2 text-indigo-600 hover:bg-indigo-50 active:scale-[.99]"
        >
          Copy to clipboard
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
