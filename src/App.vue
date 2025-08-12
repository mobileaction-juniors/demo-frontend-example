<template>
  <component :is="ResolvedLayout" />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import DefaultLayout from "@/layouts/default.vue";
import { LAYOUT } from "@/layouts/constants/layout-constants";

const route = useRoute();

const layoutMap = {
  [LAYOUT.DEFAULT]: DefaultLayout,
};

const ResolvedLayout = computed(() => {
  const key = (route.meta?.layout as string) || LAYOUT.DEFAULT;
  return layoutMap[key] || DefaultLayout;
});
</script>

<style>
/* Global app-wide styles can stay here if needed */
</style>
