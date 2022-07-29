<template>
  <DoraemonFragment ref="fragment" :payload="{ components, request }">
    <template #load="{ context }">
      <el-table :data="context.data" height="100%">
        <el-table-column
          v-for="(column, index) in columns"
          :key="index"
          class="flex-grow basis-1"
          :min-width="column.width"
        >
          <template slot="header">
            <div :class="appearance?.header">
              <span class="min-w-0 truncate"> {{ column.label }} </span>
            </div>
          </template>
          <template slot-scope="scope">
            <div :class="appearance?.content">
              <a-tooltip
                v-if="column.type === 'text'"
                :class="appearance?.contentText"
              >
                <template #title>
                  <div
                    v-html="
                      column.display
                        ? column.display(get(scope.row, column.value))
                        : get(scope.row, column.value)
                    "
                  />
                </template>
                <div
                  v-html="
                    column.display
                      ? column.display(get(scope.row, column.value))
                      : get(scope.row, column.value)
                  "
                />
              </a-tooltip>
              <component
                v-else-if="column.type === 'custom'"
                :is="column.component"
                :payload="column.payload(scope.row)"
              />
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
      appearance: {
        header: ["flex", "p-4"],
        content: ["flex", "p-4"],
        contentText: ["min-w-0", "truncate"],
      },
    };
  },
  methods: {
    get,
  },
};
</script>
