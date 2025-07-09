<script setup>
import { MaTabs2 as MaTabs, MaTabPane2 as MaTabPane } from '@mobileaction/action-kit';
import { useRouter } from 'vue-router';
import { computed } from 'vue';
import tabs from '@/constants/HeaderTabs';

const router = useRouter();

const handleSelectTab = (route) => {
  router.push(route);
};

const activeTab = computed(() => {
  return tabs.find(tab => tab.route == router.currentRoute.value.path)?.label;
});

</script>

<template>
  <header class="bg-white border-b border-gray-200 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex-1 flex justify-center">
          <MaTabs v-model:active-key="activeTab" class="nav-container">
            <MaTabPane v-for="tab in tabs" :key="tab.label" :tab-key="tab.label" :type="line" :title="tab.label" :icon="tab.icon" v-on:select-tab="handleSelectTab(tab.route)" />
          </MaTabs>
        </div>
      </div>
    </div>
  </header>
</template>


