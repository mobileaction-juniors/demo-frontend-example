<template>
  <MaCard class="ma-card" title="N-gram Selection" description="Choose n-gram types to generate (1-10)">
    <div class="flex flex-row items-center justify-center gap-6 p-4">
      <MaCheckboxCard
          v-model:checked="localClearUnwantedSelected"
      >
        <template #title>Remove Stop Words</template>
      </MaCheckboxCard>

      <MaSlider
          class="flex-1 max-w-md"
          :min="1"
          :max="maxN"
          v-model:value="localRange"
          range
      />
    </div>
  </MaCard>
</template>

<script setup>
import { computed } from 'vue'
import { MaCard, MaSlider, MaCheckbox2Card as MaCheckboxCard } from '@mobileaction/action-kit'
import { useNGramStore } from '@/stores/ngramStore'

const store = useNGramStore();
// Define props
defineProps({
  maxN: Number,
})

const localClearUnwantedSelected = computed({
  get: () => store.getClearUnwantedSelected,
  set: val => store.setClearUnwantedSelected(val)
})

const localRange = computed({
  get: () => store.getSelectedNRange,
  set: val => store.setSelectedRange(val)
})

</script>
