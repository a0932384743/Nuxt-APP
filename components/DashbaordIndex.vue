<template>
  <b-card
    text-variant="white"
    header-class="py-1 px-2"
    body-class="p-2 h-100 d-flex flex-column"
    class="bg-transparent h-100 "
    border-variant="secondary"
  >
    <b-tabs
      pills
      class="custom-pill"
      content-class="mt-3"
      nav-wrapper-class="mt-0"
      justified
    >
      <b-tab
        title="全選"
        active
      />
      <b-tab
        title="航運指數"
      />
      <b-tab
        title="經濟指數"
      />
    </b-tabs>
    <b-table
      :items="items"
      :fields="fields"
      sticky-header
      class="h-100 flex-grow-1 custom-table"
      style="max-height: max-content"
    >
      <template #cell(type)="data">
        <span class="bg-danger">{{ data.item.type }}</span>
      </template>
      <template #cell(value)="data">
        <div class="w-100">{{ data.item.value }} {{ data.item.unit }}</div>
      </template>
      <template #cell(growth)="data">
        <span> {{ data.item.growth > 0 ? '+' : '' }} {{ data.item.growth }} {{ data.item.unit }}</span>
      </template>
    </b-table>
  </b-card>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'DashboardIndex',
  data() {
    return {
      items: [],
      fields: [
        {
          key: 'category',
          label: '分類',
          sortable: true,
          stickyColumn: true,
        },
        {
          key: 'type',
          label: '指數',
          sortable: false,
          stickyColumn: true,
        },
        {
          key: 'value',
          label: '數值',
          sortable: true,
          stickyColumn: true,
        },
        {
          key: 'growth',
          label: '變化(A)',
          sortable: true,
          stickyColumn: true,
        }
      ],
    };
  },
  mounted() {
    this.$fire.database.ref('index').once('value')
      .then(ref => {
        if (ref && ref.val()) {
          this.items = ref.val();
        }
      });
  }
});
</script>
