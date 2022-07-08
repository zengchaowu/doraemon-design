<template>
  <div class="flex flex-col common-panel-gap">
    <div v-if="components.filter" :class="config?.class?.filter">
      <component :is="components.filter" ref="filter" @search="search" />
    </div>
    <div v-if="components.table" :class="config?.class?.table">
      <component
        :is="components.table"
        ref="table"
        :payload="filter"
        @mounted="tableMounted"
      />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      path: undefined,
      filter: undefined,
      components: {
        filter: undefined,
        table: undefined,
      },
      config: {
        visible: {
          filter: true,
          table: true,
        },
        class: {
          filter: ["bg-white", "common-panel-padding"],
          table: ["bg-white", "common-panel-padding"],
        },
      },
    };
  },
  created() {
    if (this.config.visible.filter) {
      this.components.filter = () =>
        import(`~/components/${this.path}/TheFilter.vue`);
    }
    if (this.config.visible.table) {
      this.components.table = () =>
        import(`~/components/${this.path}/Table.vue`);
    }
  },
  methods: {
    search(payload) {
      this.filter = payload;
    },
    tableMounted() {
      this.$refs.filter?.search
        ? this.$refs.filter.search()
        : this.$refs.table.reloadData();
    },
  },
};
</script>
