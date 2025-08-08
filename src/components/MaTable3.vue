<script setup>

import {MaCard} from "@mobileaction/action-kit";

defineProps({
  resultGrams: Array,
  headers: Array
})

</script>

<template>
  <MaCard class="flex-1 overflow-auto border border-gray-300">
    <table class="w-full border-collapse">
      <thead>
      <tr>
        <th v-for="header in headers" :key="header">{{ header }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(row, index) in resultGrams" :key="index">
        <td class="text-left w-1/2">{{ row.word }}</td>
        <td class="text-center w-1/4">{{ row.count }}</td>
        <td class="text-center w-1/4">{{ row.density }}%</td>
      </tr>
      </tbody>
    </table>
  </MaCard>
</template>

<style scoped>

</style>