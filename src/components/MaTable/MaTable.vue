<script setup>
const props = defineProps({
    class: { type: String, default: "" },
});
</script>

<template>
    <table class="w-96 text-left shadow-md rounded-lg" :class="props.class">
        <slot />
    </table>
</template>
