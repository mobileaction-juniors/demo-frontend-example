


<template>

      <div class="ma-elements-holder my-2 bg-gray-100">
        <MaKeywordGenerator @densityEmitted="takeDMR" />
        <MaKeywordDensity :receivedDMR="DMR"/>
      </div>

</template>xs



<script>
  import MaKeywordGenerator from '@/pages/keyword-generator/KeywordGenerator.vue';
  import MaKeywordDensity from '@/pages/keyword-density/KeywordDensity.vue';
  export default {
    name: 'index',
    data() {
      return {
        DMR: new Map(),
      };
    },//vue dev tools
    components: { MaKeywordGenerator, MaKeywordDensity}, //this registers the component
    methods:{
      takeDMR(DMR){
        console.log(DMR)
        this.DMR = DMR;
      }
    }
  };
</script>


<style>
.ma-elements-holder{
  //display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}
</style>




