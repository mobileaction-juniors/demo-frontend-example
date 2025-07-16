<template>
  <div class="ma-app-container">
      <the-header/>
      <router-view class="ma-main-content"/>
  </div>
</template>

<script setup>
import TheHeader from './components/TheHeader.vue';
</script>

<style lang="scss" scoped>
.ma-app-container { 
    @apply flex flex-col min-h-screen;
    .ma-main-content { 
        @apply flex-grow w-full mx-auto p-5 pt-20;
    } 
}

</style>