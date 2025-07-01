<template>
  <button
    class="ma-button"
    @click="$emit('click', $event)"
    type="button"
    :disabled="disabled"
  >
    <span v-if="icon" class="ma-button-icon">
      <component :is="icon" />
    </span>
    <span v-if="label">
      {{ label }}
    </span>
    <slot v-else />
  </button>
</template>

<script setup>
defineProps({
  icon: {
    type: [Object, Function, String],
    default: null
  },
  label: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  }
});

defineEmits(['click']); 

</script>

<style scoped>
.ma-button {
    @apply inline-flex items-center gap-2 px-3 py-2 border rounded-xl hover:bg-gray-100 transition-colors font-semibold text-sm w-fit;
}
.ma-button:disabled {
    @apply opacity-50 cursor-not-allowed;
}
.ma-button-icon {
    @apply flex items-center w-4 h-4 text-sm font-semibold; 
}
</style>
