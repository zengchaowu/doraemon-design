<template>
  <DoraemonFragment ref="fragment" :payload="{ components, request }">
    <template #load="{ context }">
      <el-table :data="context.data.load" height="100%">
        <el-table-column
          v-for="(column, index) in columns"
          :key="index"
          class="flex-grow basis-1"
          :min-width="column.width"
        >
          <template slot="header">
            <div class="flex p-4">
              <span class="min-w-0 truncate"> {{ column.label }} </span>
            </div>
          </template>
          <template slot-scope="scope">
            <div class="flex p-4">
              <span class="min-w-0 truncate">
                {{ get(scope.row, column.value) }}
              </span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </DoraemonFragment>
</template>

<script>
import get from "lodash.get";
import DoraemonFragment from "@doraemon-design/page/lib/Fragment.vue";
export default {
  components: { DoraemonFragment },
  data() {
    return {
      // 参数，会被混入到请求中。可在此处放固定参数。
      params: {
        // page和limit同时被分页指示器双向绑定。
        page: 1,
        limit: 10,
      },
      // 总数，主要用于分页。
      count: undefined,
    };
  },
  watch: {
    // 分页点击。
    "params.page"() {
      this.reloadData();
    },
    // 分页大小变化时。
    "params.limit"() {
      this.reloadData();
    },
  },
  methods: {
    get,
  },
};
</script>
