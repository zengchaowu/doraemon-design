<template>
  <DoraemonFragment
    ref="fragment"
    :payload="{ components, request }"
    class="flex flex-col gap-4 relative"
  >
    <template #load="{ context }">
      <!-- 表格内容 -->
      <div class="flex flex-col">
        <component
          :is="components?.cell"
          v-for="(row, index) in context.data.load"
          :key="index"
          :payload="{ ...row, onClick }"
          @click="select(row, index)"
        />
      </div>
    </template>
  </DoraemonFragment>
</template>

<script>
import DoraemonFragment from "@doraemon-design/page/lib/Fragment.vue";

export default {
  components: { DoraemonFragment },
  data() {
    return {
      models: {
        query: undefined,
        local: {
          page: parseInt(this.$route.query.page ?? 1),
          page_size: parseInt(this.$route.query.page_size ?? 10),
          count: 0,
        },
      },
    };
  },
  watch: {
    "$route.query": {
      deep: true,
      handler() {
        this.reloadData();
      },
    },
  },
  mounted() {
    this.reloadData();
  },
  methods: {
    reloadData() {
      this.$refs.fragment.request.load.reloadData();
    },
    onClick(row) {},
  },
};
</script>
