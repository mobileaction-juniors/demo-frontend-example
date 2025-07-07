<script setup>
import { MaTabs2, MaTabPane2 } from '@mobileaction/action-kit';
import { useRouter } from 'vue-router';
import { computed } from 'vue';

const router = useRouter();

const tabs = [
  {
    label: 'Home',
    icon: 'tick-circle',
    route: '/',
  },
  {
    label: 'Keyword Generator',
    icon: 'tick-circle',
    route: '/keyword-generator',
  },
  {
    label: 'Keyword Density',
    icon: 'tick-circle',
    route: '/keyword-density',
  },
];

const handleSelectTab = (route) => {
  router.push(route);
};

const activeTab = computed(() => {
  return tabs.find(tab => tab.route === router.currentRoute.value.path)?.label;
});

</script>

<template>
  <MaTabs2 v-model:active-key="activeTab" class="nav-container">
    <MaTabPane2 v-for="tab in tabs" :key="tab.label" :tab-key="tab.label" :type="line" :title="tab.label" :icon="tab.icon" v-on:select-tab="handleSelectTab(tab.route)" />
  </MaTabs2>
</template>