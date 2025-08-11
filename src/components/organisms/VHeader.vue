<template>
  <header class="main-header">
    <div class="header-brand">
      <MaIcon name="rocket" class="brand-icon" />
      <h1 class="brand-title">Mobile Action Internship Tools</h1>
    </div>
    <div class="header-nav">
      <MaTabs
        v-model:activeKey="activeTab"
        type="line"
        tabPosition="top"
        animated
        class="header-tabs"
        @change="handleTabChange"
      >
        <MaTabPane key="home" tab="Main"></MaTabPane>
        <MaTabPane key="keyword-generator" tab="Keyword Generator"></MaTabPane>
      </MaTabs>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { MaIcon, MaTabs, MaTabPane } from "@mobileaction/action-kit";

const router = useRouter();
const route = useRoute();

const activeTab = ref("home");

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

// Keep tab highlighting in sync with current route
// This ensures correct tab is highlighted regardless of how user navigates 
// (clicking tabs, direct URL, browser back/forward buttons)
watch(
  () => route.name,
  (name) => {
    const tabKey = tabMap[name as keyof typeof tabMap];
    if (tabKey) {
      activeTab.value = tabKey;
    }
  },
  { immediate: true }
);
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
