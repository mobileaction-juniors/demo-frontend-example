<script setup>
defineProps({
  rows: { type: Array, default: () => [] }
})
</script>

<template>
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
        <tr v-if="!rows.length" class="bg-white">
          <td colspan="3" class="px-4 py-4 text-neutral-500">Enter text and press Count.</td>
        </tr>
        <tr v-for="row in rows" :key="row.keywords_csv" class="odd:bg-white even:bg-neutral-50">
          <td class="px-4 py-3 break-words max-w-[60vw]">{{ row.keywords_csv }}</td>
          <td class="px-4 py-3 text-right">{{ row.count }}</td>
          <td class="px-4 py-3 text-right">{{ row.density.toFixed(1) }}%</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
