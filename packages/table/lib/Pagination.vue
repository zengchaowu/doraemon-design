<template>
  <div v-if="count > 0" class="flex justify-end">
    <a-pagination
      :current="models.local.page"
      :page-size="models.local.page_size"
      :total="count"
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
    count: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      models: {
        local: {
          page: 0,
          page_size: 10,
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
    onShowSizeChange(pageSize) {
      this.models.local.page_size = pageSize;
      const query = Object.assign({}, this.$route.query, {
        page_size: this.models.local.page_size,
      });
      this.$router.push({ path: this.$route.path, query });
    },
  },
};
</script>
