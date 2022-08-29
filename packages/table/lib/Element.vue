<template>
  <DoraemonFragment ref="fragment" :payload="{ components, request }">
    <template #load="{ context }">
      <el-table :data="context.data" height="100%" @row-click="handleRowClick">
        <template v-for="(column, index) in columns">
          <el-table-column
            v-if="column?.visible !== false"
            :key="index"
            class="flex-grow basis-1"
            :min-width="column.width"
            :fixed="column.fixed"
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
                      class="whitespace-pre-wrap"
                      v-html="
                        column.display
                          ? column.display(get(scope.row, column.value))
                          : get(scope.row, column.value)
                      "
                    />
                  </template>
                  <div
                    class="whitespace-pre-wrap line-clamp-2"
                    v-html="
                      column.display
                        ? column.display(get(scope.row, column.value))
                        : get(scope.row, column.value)
                    "
                  />
                </a-tooltip>
                <div v-else-if="column.type === 'index'">
                  <span>{{ scope.$index + 1 }}</span>
                </div>
                <component
                  v-else-if="column.type === 'custom'"
                  :is="column.component"
                  :payload="
                    column.payload ? column.payload(scope.row) : undefined
                  "
                />
              </div>
            </template>
          </el-table-column>
        </template>
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
        header: ["flex"],
        content: ["flex"],
        contentText: ["min-w-0", "truncate"],
      },
    };
  },
  methods: {
    get,
    handleRowClick() {},
  },
};
</script>
