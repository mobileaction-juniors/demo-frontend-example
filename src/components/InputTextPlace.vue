<template>
  <div class="input-group">
    <div class="input-column">
      <p><strong>Message:</strong> {{ inputValue }}</p>
      <MaInput
          v-model:value="inputValue"
          type="textarea"
          title="Input Title"
          size="large"
          placeholder="n-gram me"
          hintText="Write your text to create ngrams"
      />
    </div>
  </div>
</template>

<script setup>
import { MaInput } from '@mobileaction/action-kit'
import {computed} from "vue";

const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);
const inputValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
});

</script>
