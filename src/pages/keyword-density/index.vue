<script setup>
import KeywordDensityReview from '../../components/KeywordDensityReview.vue'

const firstLoadText = `MobileAction helps mobile growth teams optimize app visibility and campaign results.
Use this review page to inspect keyword count and percentage values in your copy.`
</script>

<template>
  <KeywordDensityReview :initial-text="firstLoadText" />
</template>
