<script setup>
import { defineModel, defineProps } from 'vue'
import { MaForm, MaInput } from '@mobileaction/action-kit'
import '@mobileaction/action-kit/dist/style.css'

const modelValue = defineModel({ type: String, required: true })

const props = defineProps({
  rows: { type: Number, default: 14 },
  placeholder: { type: String, default: 'Paste your text here and press "Count".' },
  label: { type: String, default: '' },
  inputId: { type: String, default: 'form-textarea' },
  formClass: { type: String, default: 'w-full' },
  inputClass: { type: String, default: 'w-full' }
})
</script>

<template>
  <ma-form :model="{ text: modelValue }" label-position="top" :class="formClass">
    <ma-input
      :id="inputId"
      v-model:value="modelValue"
      type="textarea"
      :label="label"
      :placeholder="placeholder"
      :rows="rows"
      :class="inputClass"
    />
  </ma-form>
</template>
