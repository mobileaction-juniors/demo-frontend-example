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
    customClass: {
        type: String,
        default: ''
    }
});

const emit = defineEmits(['update:modelValue']);

const handleInput = (event) => {
    emit('update:modelValue', event.target.value);
}
</script>

<template>
    <textarea
        :placeholder="placeholder"
        :value="modelValue"
        :class="['ma-text-input', customClass]"
        @input="handleInput"
    />
</template>

<style lang="scss" scoped>
.ma-text-input {
    /* @apply w-full h-full bg-white p-3 rounded-xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-base resize-none; */
    width: 100%;
    height: 100%;
    background-color: #fff;
    padding: 12px;
    border-radius: 12px;
    border: 1px solid #e5e7eb;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    font-size: 16px;
    resize: none;
    &:focus {
        outline: none;
        box-shadow: 0 0 0 2px #000;
        border-color: #000;
    }
}
</style>