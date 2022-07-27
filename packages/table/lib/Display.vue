<template>
  <div class="flex flex-col gap-4">
    <DoraemonFragment
      ref="fragment"
      :payload="{ components, request }"
      class="flex flex-col relative"
    >
      <template #load="{ context }">
        <!-- 表头 -->
        <div class="flex">
          <div
            v-for="(column, index) in columns"
            :key="index"
            class="flex-grow basis-1"
          >
            <div class="min-w-0 flex justify-center p-2">
              <span class="min-w-0 truncate">
                {{ column.label }}
              </span>
            </div>
          </div>
        </div>
        <!-- 表格内容 -->
        <div class="min-w-0 flex flex-col">
          <div
            v-for="(row, index) in context.data.load"
            :key="index"
            class="flex"
            @click="select(row, index)"
          >
            <div
              v-for="column in columns"
              :key="column.value"
              class="min-w-0 flex p-2"
            >
              <template v-if="column.type === 'index'">
                <span class="flex items-center">
                  {{ (params.page - 1) * params.limit + index + 1 }}
                </span>
              </template>
              <template v-else-if="column.type === 'text'">
                <span class="min-w-0 truncate flex items-center">
                  {{ keypath(row, column.value) }}
                </span>
              </template>
            </div>
          </div>
        </div>
      </template>
    </DoraemonFragment>
    <div v-if="models?.local?.count > 0" class="flex justify-end">
      <a-pagination
        :current="models.local.page"
        :page-size="models.local.page_size"
        :total="models.local.count"
        show-size-changer
        @change="onChange"
        @showSizeChange="onShowSizeChange"
      />
    </div>
  </div>
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
    select(item, index) {
      if (this.config?.callback?.select) {
        this.config?.callback?.select(item, index);
      }
    },
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
