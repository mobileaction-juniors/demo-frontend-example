<script setup>
import { useRouter } from 'vue-router'
import { MaButton} from '@mobileaction/action-kit'

const router = useRouter();

function goToKeywordGenerator() {
  router.push('/keyword-generator');
}
</script>
<template>
    <div style="text-align: center">
        <h1>Welcome to Onboarding Progress </h1>
        <p>You can see the your first task details via link. Please continue that steps while coding. </p>
        <MaButton @click="goToKeywordGenerator" variant="stroke" size="large" >Go to Keyword Generator</MaButton>
    </div>
</template>