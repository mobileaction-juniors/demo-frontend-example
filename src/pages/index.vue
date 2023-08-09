



<template>
    <div>
      <div class="ma-elements-holder">
        <MaKeywordGenerator />
      </div>
    </div>
</template>



<script>
  import MaKeywordGenerator from '@/pages/keyword-generator/KeywordGenerator.vue';
  export default {
    name: 'index',
    components: { MaKeywordGenerator }, //this registers the component
  };
</script>

<style scoped>

</style>
