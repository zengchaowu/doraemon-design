<template>
  <div class="flex flex-col gap-4">
    <DoraemonFragment ref="fragment" :payload="{ components, request }">
      <template #load="{ context }">
        <div class="relative flex">
          <div class="min-w-0 flex-grow flex flex-col">
            <!-- 表头 -->
            <div
              v-if="config?.columns"
              class="relative z-10 min-w-0 flex h-12"
              :class="
                []
                  .concat(
                    config?.appearance?.border?.visible?.header
                      ? ['border-b', 'border-border']
                      : undefined
                  )
                  .concat(config?.appearance?.class?.header)
              "
            >
              <template v-for="(item, index) in config?.columns">
                <div
                  v-if="
                    item.isHidden === undefined || item.isHidden(item) !== true
                  "
                  :key="index"
                  class="min-w-0 flex p-2"
                  :class="
                    []
                      .concat(
                        item.basis
                          ? ['flex-grow', `basis-${item.basis}/24`]
                          : undefined
                      )
                      .concat(config?.appearance?.class?.column)
                  "
                >
                  <span class="min-w-0 truncate">
                    <Notice
                      :payload="{
                        required:
                          type === 'input' &&
                          item.required !== false &&
                          !preview,
                      }"
                    >
                      <a-tooltip class="min-w-0 truncate">
                        <template #title>
                          {{ item.label }}
                        </template>
                        {{ item.label }}
                      </a-tooltip>
                    </Notice>
                  </span>
                </div>
              </template>
            </div>
            <!-- 表格内容 -->
            <div
              class="min-w-0 flex flex-col"
              :class="
                [].concat(
                  config?.appearance?.border?.visible?.cell
                    ? ['divide-y', 'divide-border']
                    : undefined
                )
              "
            >
              <!-- 自定义行组件 -->
              <template v-if="config?.cell">
                <div v-for="(item, index) in list" :key="index">
                  <component
                    :is="config.cell"
                    :payload="item"
                    :class="
                      [].concat(
                        config?.callback?.select
                          ? config?.appearance?.class?.select
                          : undefined
                      )
                    "
                    @click.native="click(item, index)"
                  />
                </div>
              </template>
              <!-- 默认行展示 -->
              <template v-else>
                <div
                  v-for="(item, index) in list"
                  :key="item.id"
                  class="h-12 flex"
                  :class="
                    []
                      .concat(
                        config?.callback?.select
                          ? config?.appearance?.class?.select
                          : undefined
                      )
                      .concat(
                        config?.appearance?.border?.visible?.column
                          ? ['divide-x', 'divide-border']
                          : undefined
                      )
                      .concat(config?.appearance?.class?.cell)
                  "
                  @click="click(item, index)"
                >
                  <template v-for="column in config?.columns">
                    <div
                      v-if="
                        column.isHidden === undefined ||
                        column.isHidden(column) !== true
                      "
                      :key="column.value"
                      class="min-w-0 flex p-2"
                      :class="
                        []
                          .concat(
                            column.basis
                              ? ['flex-grow', `basis-${column.basis}/24`]
                              : undefined
                          )
                          .concat(config?.appearance?.class?.column)
                      "
                    >
                      <!-- 展示型 -->
                      <template v-if="type === undefined">
                        <template v-if="column.type === 'index'">
                          <span class="flex items-center">
                            {{ (params.page - 1) * params.limit + index + 1 }}
                          </span>
                        </template>
                        <template v-else-if="column.type === 'text'">
                          <span class="min-w-0 truncate flex items-center">
                            <a-tooltip class="min-w-0 truncate">
                              <template #title>
                                {{
                                  config?.maps?.display &&
                                  config?.maps?.display[column.value]
                                    ? config?.maps?.display[column.value](
                                        keypath(item, column.value)
                                      )
                                    : keypath(item, column.value)
                                }}
                              </template>
                              {{
                                config?.maps?.display &&
                                config?.maps?.display[column.value]
                                  ? config?.maps?.display[column.value](
                                      keypath(item, column.value)
                                    )
                                  : keypath(item, column.value)
                              }}
                            </a-tooltip>
                          </span>
                        </template>
                        <template v-else-if="column.type === 'file'">
                          <button
                            type="button"
                            class="min-w-0 truncate"
                            @click="column.method(item)"
                          >
                            {{
                              config?.maps?.display &&
                              config?.maps?.display[column.value]
                                ? config?.maps?.display[column.value](
                                    keypath(item, column.value)
                                  )
                                : keypath(item, column.value)
                            }}
                          </button>
                        </template>
                        <template v-else-if="column.type === 'image'">
                          <button
                            class="min-w-0 truncate flex items-center"
                            @click="previewImage(keypath(item, column.value))"
                          >
                            <a-tooltip class="min-w-0 truncate">
                              <template #title>
                                <img
                                  :src="keypath(item, column.value)"
                                  class="w-30 h-30 object-cover"
                                />
                              </template>
                              {{
                                config?.maps?.display &&
                                config?.maps?.display[column.value]
                                  ? config?.maps?.display[column.value](
                                      keypath(item, column.value)
                                    )
                                  : keypath(item, column.value)
                              }}
                            </a-tooltip>
                          </button>
                        </template>
                        <template v-else-if="column.type === 'button'">
                          <button
                            type="button"
                            class="min-w-0 truncate"
                            @click="column.method(item)"
                          >
                            {{
                              config?.maps?.display &&
                              config?.maps?.display[column.value]
                                ? config?.maps?.display[column.value](
                                    keypath(item, column.value)
                                  )
                                : keypath(item, column.value)
                            }}
                          </button>
                        </template>
                      </template>
                      <!-- 输入型 -->
                      <template v-else-if="type === 'input'">
                        <template v-if="column.type === 'text'">
                          <InputText
                            v-model="item.models[column.value]"
                            :disabled="preview || column.disabled"
                            :preview="preview"
                            :payload="column"
                          />
                        </template>
                        <template v-if="column.type === 'number'">
                          <InputNumber
                            v-model="item.models[column.value]"
                            :disabled="preview || column.disabled"
                            :preview="preview"
                            :payload="column"
                          />
                        </template>
                        <template v-else-if="column.type === 'file'">
                          <InputFile
                            v-model="item.models[column.value]"
                            :disabled="preview || column.disabled"
                            :preview="preview"
                            :payload="{
                              ...column,
                              method: (file) => {
                                item.models[column.value.replace('_arr', '')] =
                                  file.download;
                                item.models[column.value] = file;
                                $forceUpdate();
                                handleListChange();
                              },
                            }"
                          />
                        </template>
                        <template v-else-if="column.type === 'date'">
                          <InputDate
                            v-model="item.models[column.value]"
                            :disabled="preview || column.disabled"
                            :preview="preview"
                            :payload="column"
                            class="items-center"
                          />
                        </template>
                        <template v-else-if="column.type === 'material'">
                          <InputMaterial
                            v-model="item.models[column.value]"
                            :disabled="preview || column.disabled"
                            :preview="preview"
                            :payload="column"
                          />
                        </template>
                        <template v-else-if="column.type === 'supplier'">
                          <InputSupplier
                            v-model="item.models[column.value]"
                            :disabled="preview || column.disabled"
                            :preview="preview"
                            :payload="column"
                          />
                        </template>
                      </template>
                    </div>
                  </template>
                </div>
              </template>
            </div>
          </div>
          <!-- 操作列表 -->
          <div
            v-if="config?.actions && !preview"
            class="flex-none flex flex-col"
            :class="
              [].concat(
                config?.appearance?.border?.visible?.column
                  ? ['border-l', 'border-border']
                  : undefined
              )
            "
          >
            <span
              class="relative z-10 flex h-12"
              :class="
                []
                  .concat(
                    config?.appearance?.border?.visible?.header
                      ? ['border-b', 'border-border']
                      : undefined
                  )
                  .concat(config?.appearance?.class?.header)
              "
            >
              <span
                class="min-w-0 flex p-2"
                :class="[].concat(config?.appearance?.class?.column)"
              >
                {{ config?.appearance?.label?.action }}
              </span>
            </span>
            <div
              class="flex flex-col"
              :class="
                [].concat(
                  config?.appearance?.border?.visible?.cell
                    ? ['divide-y', 'divide-border']
                    : undefined
                )
              "
            >
              <div
                v-for="(item, index) in list"
                :key="item.id"
                class="h-12 flex items-center justify-center gap-2 px-2"
                :class="[].concat(config?.appearance?.class?.column)"
              >
                <template v-for="action in config?.actions">
                  <template v-if="action.display(item, index)">
                    <ButtonAction
                      :key="action.id"
                      :payload="action"
                      @click="action.method(item, index)"
                    >
                      {{ action.label(item, index) }}
                    </ButtonAction>
                  </template>
                </template>
              </div>
            </div>
          </div>
        </div>
      </template>
    </DoraemonFragment>
    <div class="flex justify-end">
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
