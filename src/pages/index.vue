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
      components: { MaKeywordGenerator },
    };

</script>

<style scoped>
.ma-elements-holder {
  text-align: center;
}
</style>
