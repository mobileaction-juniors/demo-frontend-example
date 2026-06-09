<script setup>
import TheHeader from './components/TheHeader.vue'
</script>

<template>
  <div>
      <TheHeader />
      <div>
          <div>
              <router-view/>
          </div>
      </div>
  </div>
</template>



