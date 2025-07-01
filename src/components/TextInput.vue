<template>
    <textarea
        :type="type"
        :placeholder="placeholder"
        :value="modelValue"
        :class="['ma-text-input', customClass]"
        @input="$emit('update:modelValue', $event.target.value)"
    />
</template>
<script setup>
defineProps({
    modelValue: {
        type: String,
        default: ''
    },
    placeholder: {
        type: String,
        default: 'Enter your text here'
    },
    type: {
        type: String,
        default: 'text'
    },
    customClass: {
        type: String,
        default: ''
    }
});

defineEmits(['update:modelValue']);
</script>
<style scoped>
.ma-text-input {
    @apply w-full h-full bg-white p-3 rounded-xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-base resize-none;
}
</style>