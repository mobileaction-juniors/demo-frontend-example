<script setup>

import {MaCard} from "@mobileaction/action-kit";
import { useNGramStore } from '@/stores/ngramStore'

const store = useNGramStore();

</script>

<template>
  <MaCard
      class="overflow-auto
         md:min-h-[26vh] max-h-[26vh] md:max-h-[26vh] lg:max-h-[26vh]
         p-0 [&>*]:p-0"
  >
    <table class="w-full border-collapse text-sm">
      <thead>
      <tr class="bg-blue-600 text-white">
        <th
            v-for="header in store.getHeaders"
            :key="header"
            class="px-4 py-2 text-left font-semibold"
        >
          {{ header }}
        </th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="(row, index) in store.getResultGrams"
          :key="index"
          :class="index % 2 === 0 ? 'bg-gray-50' : 'bg-white'"
          class="hover:bg-blue-50 transition-colors"
      >
        <td class="px-4 py-2 w-1/2 font-medium text-gray-800">{{ row.word }}</td>
        <td class="px-4 py-2 w-1/4 text-center text-gray-700">{{ row.count }}</td>
        <td class="px-4 py-2 w-1/4 text-center text-gray-700">{{ row.density != null ? row.density.toFixed(2) : '-' }}%</td>
      </tr>
      </tbody>
    </table>
  </MaCard>


</template>

<style scoped>

</style>