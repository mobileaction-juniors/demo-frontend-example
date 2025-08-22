<script setup>
import { computed } from 'vue'
import KeywordTable from '@/components/molecules/KeywordTable.vue'
import CsvPreviewCopy from '@/components/molecules/CsvPreviewCopy.vue'

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
</script>

<template>
  <div class="w-full">
    <KeywordTable :rows="grouped_rows" />

    <CsvPreviewCopy
      v-if="grouped_rows.length"
      :text="all_keywords_csv"
      @copied="() => console.log('copied!')"
    />
  </div>
</template>
