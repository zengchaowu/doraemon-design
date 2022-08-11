<template>
  <DoraemonFragment
    ref="fragment"
    :payload="{ components, request }"
    :class="appearance?.container"
  >
    <template #load="{ context }">
      <!-- 表格内容 -->
      <component
        :is="components?.cell"
        v-for="(row, index) in context.data"
        :key="index"
        :class="appearance?.container"
        :payload="{ ...row, onClick }"
        @click="select(row, index)"
      />
    </template>
  </DoraemonFragment>
</template>

<script>
import DoraemonFragment from "@doraemon-design/page/lib/Fragment.vue";

export default {
  components: { DoraemonFragment },
  data() {
    return {
      appearance: {
        container: ["flex", "flex-col", "gap-4", "relative"],
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
