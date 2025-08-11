<script setup>
const props = defineProps({
    route: {
        type: String,
        required: true,
    },
});
</script>

<template>
    <router-link active-class="font-bold" :to="props.route">
        <slot></slot>
    </router-link>
</template>
