<script setup>
import {ref} from "vue";
import {MaTextarea} from "@mobileaction/action-kit";

const props = defineProps({
  text: {
    type: String,
    required: true
  }
})

const inputText = ref(props.text)
</script>

<template>
  <div>
    <h1>Keyword Count & Density</h1>
    <div>
      <ma-textarea v-model:value="inputText" placeholder="{{inputText}}"/>
    </div>
  </div>


</template>

<style scoped>

</style>