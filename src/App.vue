<script setup>
import TheHeader from './components/TheHeader.vue';
</script>
<template>
  <div>
      <the-header/>
      <div>
          <div>
              <router-view/>
          </div>
      </div>
  </div>
</template>



