<script setup>
const props = defineProps({
  text: { type: String, required: true },
  buttonText: { type: String, default: 'Copy to clipboard' }
})

const emit = defineEmits(['copied'])

async function copyCsv() {
  await navigator.clipboard?.writeText(props.text)
  emit('copied')
}
</script>

<template>
  <div class="mt-3">
    <div class="w-full rounded-xl bg-neutral-100 px-4 py-3 text-neutral-700">
      {{ text }}
    </div>
    <div class="mt-3">
      <button
        type="button"
        @click="copyCsv"
        class="rounded-lg border border-indigo-200 px-4 py-2 text-indigo-600 hover:bg-indigo-50 active:scale-[.99]"
      >
        {{ buttonText }}
      </button>
    </div>
  </div>
</template>
