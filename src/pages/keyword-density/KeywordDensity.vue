<script setup>
import { MaAnimation } from '@mobileaction/action-kit';


</script>

<template>
    <div class="ma-keyword-density-container">
        <MaAnimation name="rocket" :width="400" :height="200"/>
        <p class="ma-keyword-density-text">Haven't implemented yet</p>
    </div>
</template>

<style lang="scss" scoped>
.ma-keyword-density-container {
    @apply w-full h-full flex flex-col items-center justify-center gap-4;
    .ma-keyword-density-text {
        @apply text-lg;       
    }
}
</style>