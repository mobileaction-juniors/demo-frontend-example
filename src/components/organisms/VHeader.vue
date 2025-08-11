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

const emit = defineEmits(["tab-change"]);

const handleTabChange = (key: string) => {
  // Navigate based on tab key
  if (key === "home") {
    router.push({ name: "Home" });
  } else if (key === "keyword-generator") {
    router.push({ name: "KeywordGenerator" });
  }
  emit("tab-change", key);
};

// Keep tab state in sync with route
watch(
  () => route.name,
  (name) => {
    if (name === "Home") activeTab.value = "home";
    else if (name === "KeywordGenerator") activeTab.value = "keyword-generator";
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
