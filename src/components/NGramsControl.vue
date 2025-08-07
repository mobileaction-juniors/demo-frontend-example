<template>
  <MaCard class="ma-card" title="N-gram Selection" description="Choose n-gram types to generate (1-10)">
    <div class="flex flex-row items-center justify-center gap-6 p-4">
      <MaCheckboxCard
          class="flex-1 max-w-sm"
          v-model:checked="localClearUnwantedSelected"
      >
        <template #title>Remove Stop Words</template>
      </MaCheckboxCard>

      <MaSlider
          class="flex-1 max-w-md"
          :min="1"
          :max="maxN"
          v-model:value="localSelectedNRange"
          range
      />
    </div>
  </MaCard>
</template>

<script setup>
import { computed } from 'vue'
import { MaCard, MaSlider, MaCheckbox2Card as MaCheckboxCard } from '@mobileaction/action-kit'

// Define props
const props = defineProps({
  maxN: Number,
  selectedNRange: Array,
  clearUnwantedSelected: Boolean
})

// Define emit
const emit = defineEmits(['update:selectedNRange', 'update:clearUnwantedSelected'])

// Computed proxies
const localSelectedNRange = computed({
  get: () => props.selectedNRange,
  set: val => emit('update:selectedNRange', val)
})

const localClearUnwantedSelected = computed({
  get: () => props.clearUnwantedSelected,
  set: val => emit('update:clearUnwantedSelected', val)
})
</script>
