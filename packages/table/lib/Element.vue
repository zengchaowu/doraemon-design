<template>
  <DoraemonFragment
    ref="fragment"
    :payload="{ components, request }"
    class="flex flex-col gap-4 relative"
  >
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
              <span
                class="min-w-0 truncate"
                v-html="get(scope.row, column.value)"
              >
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column v-if="actions" fixed="right" width="200">
          <template slot="header">
            <div class="flex-center">
              <span class="min-w-0 truncate"> 操作 </span>
            </div>
          </template>
          <template slot-scope="scope">
            <div class="flex-center gap-2">
              <a-button type="primary">删除</a-button>
              <a-button type="primary">删除</a-button>
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
      actions: undefined,
      columns: undefined,
    };
  },
  methods: {
    get,
  },
};
</script>
