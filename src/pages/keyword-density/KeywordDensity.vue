<template>
  <div class="ma-elements-holder">
    <DensityTextarea @count-density="calculateDensity"></DensityTextarea>
    <Table v-if="showTable" :keywords="keywords"/>
  </div>
</template>

<script setup>
import DensityTextarea from '@/components/DensityTextarea.vue';
import Table from '@/components/DensityTable.vue';
import { ref } from 'vue';
import { message } from 'ant-design-vue';

const showTable = ref(false);
const keywords = ref("");

// show table
const calculateDensity = (givenText) => {
  if ( givenText.trim() === "" )
  {
    showTable.value = false;
    noTextError();
  }
  else {
    keywords.value = givenText;
    showTable.value = true;
  }
}

// to show error message
const noTextError = () => {
  message.error('Please enter a text first!',4);
};
</script>

<style scoped>
.ma-elements-holder{
  @apply flex flex-col md:flex-row;
}
</style>