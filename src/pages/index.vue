<script setup>
import Button from '@/components/Button.vue'
import { useRouter } from 'vue-router'

const router = useRouter();

function goToKeywordGenerator() {
  router.push('/keyword-generator');
}
</script>
<template>
    <div style="text-align: center">
        <h1>Welcome to Onboarding Progress </h1>
        <p>You can see the your first task details via link. Please continue that steps while coding. </p>
        <Button label="Go to Keyword Generator" @click="goToKeywordGenerator" />
    </div>
</template>