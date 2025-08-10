<script setup>
import MaNavRouter from "./MaNavRouter.vue";

const props = defineProps({
    class: { type: String, default: "" },
});
</script>

<template>
    <div
        class="flex items-center justify-between gap-4 max-phone:text-sm"
        :class="props.class"
    >
        <MaNavRouter route="/keyword-generator">Generator</MaNavRouter>
        <MaNavRouter route="/keyword-density">Density</MaNavRouter>
    </div>
</template>
