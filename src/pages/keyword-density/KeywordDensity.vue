

<template>
  <div class="min-h-screen justify-center p-10">
    <Table :dataSource="tableData" :columns="tableColumns" />
  </div>
</template>

<script>
import { Table } from 'ant-design-vue';


export default {
  name: 'KeywordDensity',
  components: { Table },
  props: {
    receivedDMR: {
      type: Map,
      required: true,
    },
  },
  created() {

  },
  computed: {
    tableData() {
      // Convert the Map into an array of objects for the table
      return Array.from(this.receivedDMR, ([key, value]) => ({ key:key+"%", value: value.join(', ') }));
    },
    tableColumns() {
      return [
        {
          title: 'Percentage',
          dataIndex: 'key',
          key: 'key',
        },
        {
          title: 'Words',
          dataIndex: 'value',
          key: 'value',
        },
      ];
    },
  },
};

</script>





