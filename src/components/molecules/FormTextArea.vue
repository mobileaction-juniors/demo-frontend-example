<script setup>
import { computed } from 'vue'
import { MaForm, MaInput } from '@mobileaction/action-kit'
import '@mobileaction/action-kit/dist/style.css'

const props = defineProps({
  modelValue: { type: String, required: true }, // v-model
  rows: { type: Number, default: 14 },
  placeholder: { type: String, default: 'Paste your text here and press "Count".' },
  label: { type: String, default: '' },
  inputId: { type: String, default: 'form-textarea' },
  formClass: { type: String, default: 'w-full' },
  inputClass: { type: String, default: 'w-full' },
})

const emit = defineEmits(['update:modelValue'])

const value = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v),
})
</script>

<template>
  <ma-form :model="{ text: value }" label-position="top" :class="formClass">
    <ma-input
      :id="inputId"
      v-model:value="value"
      type="textarea"
      :label="label"
      :placeholder="placeholder"
      :rows="rows"
      :class="inputClass"
    />
  </ma-form>
</template>
