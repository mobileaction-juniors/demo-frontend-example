<template>
  <header class="main-header">
    <div class="header-brand">
      <ma-icon name="rocket" class="brand-icon" />
      <h1 class="brand-title">Mobile Action Internship Tools</h1>
    </div>
    <div class="header-nav">
      <ma-tabs
        v-model:activeKey="activeTab"
        type="line"
        tab-position="top"
        animated
        class="header-tabs"
        @change="handleTabChange"
      >
        <ma-tab-pane key="home" tab="Main"></ma-tab-pane>
        <ma-tab-pane key="keyword-generator" tab="Keyword Generator"></ma-tab-pane>
      </ma-tabs>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { MaIcon, MaTabs, MaTabPane } from "@mobileaction/action-kit";

const router = useRouter();
const route = useRoute();

const routeMap = {
  home: "Home",
  "keyword-generator": "KeywordGenerator"
} as const;

const tabMap = {
  Home: "home",
  KeywordGenerator: "keyword-generator"
} as const;

const handleTabChange = (key: string) => {
  const routeName = routeMap[key as keyof typeof routeMap];
  if (routeName) {
    router.push({ name: routeName });
  }
};

const activeTab = computed(() => {
	const routeName = route.name;
	return tabMap[routeName as keyof typeof tabMap]
});
</script>

<style>
@reference "tailwindcss";

.main-header {
  @apply bg-white shadow-sm border-b border-gray-200 px-6 py-2 flex justify-between items-center;
}

.header-brand {
  @apply flex items-center gap-3;
}

.brand-icon {
  @apply text-2xl;
}

.brand-title {
  @apply text-lg font-bold text-gray-800;
}

.header-nav {
  @apply flex items-center;
}

.header-tabs {
  @apply text-base;
}

.header-tabs :deep(.antd-tabs-tab-btn) {
  @apply px-4 py-2 text-base font-medium;
}
</style>
