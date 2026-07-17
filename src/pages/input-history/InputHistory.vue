<script setup>
import InputHistory from "@/components/InputHistory.vue";
</script>

<template>
  <div
      class="mx-auto mt-8 flex w-full max-w-368 flex-col gap-5 rounded-xl border
      border-gray-100 bg-white p-6 shadow-sm"
  >
    <div class="border-b border-gray-200 pb-3">
      <span class="text-xl font-bold text-gray-800">Input History</span>
    </div>

    <InputHistory/>
  </div>
</template>
