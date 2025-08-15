<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { LAYOUTS } from '@/constants/layout-constants'

import DefaultLayout from '@/layouts/default.vue'
import AuthLayout from '@/layouts/auth.vue'
import BlankLayout from '@/layouts/blank.vue'

const route = useRoute()

const layoutMap = {
  [LAYOUTS.DEFAULT]: DefaultLayout,
  [LAYOUTS.AUTH]: AuthLayout,
  [LAYOUTS.BLANK]: BlankLayout,
}

const activeLayout = computed(() => layoutMap[route.meta.layout] || DefaultLayout)
</script>

<template>
  <component :is="activeLayout">
    <router-view />
  </component>
</template>
