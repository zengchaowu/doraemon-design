<template>
  <div v-if="store?.count > 0" class="flex justify-end overflow-hidden">
    <a-pagination
      :current="models.local.page"
      :page-size="models.local.page_size"
      :total="store.count"
      :show-total="(total) => `共 ${total} 条`"
      show-size-changer
      @change="onChange"
      @showSizeChange="onShowSizeChange"
    />
  </div>
</template>

<script>
export default {
  inject: ["version"],
  props: {
    store: {
      type: Object,
      default: undefined,
    },
  },
  data() {
    return {
      models: {
        local: {
          page: parseInt(this.$route.query.page ?? 1),
          page_size: parseInt(this.$route.query.page_size ?? 10),
        },
      },
    };
  },
  watch: {
    version() {
      this.models.local.page = parseInt(this.$route.query.page ?? 1);
      this.models.local.page_size = parseInt(this.$route.query.page_size ?? 10);
    },
  },
  methods: {
    onChange(page) {
      this.models.local.page = page;
      const query = Object.assign({}, this.$route.query, {
        page: this.models.local.page,
      });
      this.$router.push({ path: this.$route.path, query });
    },
    onShowSizeChange(_current, pageSize) {
      this.models.local.page_size = pageSize;
      const query = Object.assign({}, this.$route.query, {
        page_size: this.models.local.page_size,
      });
      this.$router.push({ path: this.$route.path, query });
    },
  },
};
</script>
