<template>
  <DoraemonFragment ref="fragment" :payload="{ components, request }">
    <template #load="{ context }">
      <div
        class="relative flex"
        :class="
          [].concat(
            // 自定义cell和outter为真才显示边框
            !config?.cell && config?.appearance?.border?.visible?.outter
              ? ['border-border', 'border-1']
              : undefined
          )
        "
      >
        <!-- 表头背景 -->
        <div
          v-if="config?.columns"
          class="absolute left-0 top-0 right-0 h-12"
          :class="config?.appearance?.class?.headerBackground"
        />
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
                        type === 'input' && item.required !== false && !preview,
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
                    </template>
                  </div>
                </template>
              </div>
            </template>
          </div>
        </div>
      </div>
    </template>
  </DoraemonFragment>
</template>

<script>
import isNil from "lodash.isnil";
import { get as keypath } from "object-path";
import DoraemonFragment from "@doraemon-design/page/lib/Fragment.vue";
export default {
  components: { DoraemonFragment },
  model: {
    prop: "value",
    event: "update",
  },
  props: {
    // 双向数据绑定，用户初始化列表和返回编辑后的数据。(此处只有input使用，并且不响应value的变化。)
    value: {
      type: Array,
      default: undefined,
    },
    // 负载对象，此对象用来修改请求的请求体，请求体会混合这个对象。
    // 用途：外部Filter条件变化。所以这个对象会被watch。
    payload: {
      type: Object,
      default: undefined,
    },
  },
  data() {
    return {
      // 双向数据绑定，暂时只用于config.buttons中的部分有状态组件
      models: {},
      // 弹窗
      modals: {},
      // 配置，用于动态生成页面。
      config: {
        // 列定义 { label:列名，value:列对应的参数名（展示时可使用content.content.content跨层读取），用于双向绑定，type：列类型。basis：宽比例，总12格。}
        columns: undefined,
        // 自定义Cell
        cell: undefined,
        // 所有操作。{id:唯一标识，display:(item)=>{return true}}是否展示, label: (item)=>{return label}展示文字。method: (item)=>{}点击动作
        actions: undefined,
        // 外观
        appearance: {
          // 文本
          label: {
            action: "操作",
          },
          // 分页是否能用
          visible: {
            pagination: true,
          },
          // 骨架屏
          skeleton: {
            rows: undefined,
          },
        },
      },
      // 参数，会被混入到请求中。可在此处放固定参数。
      params: {
        // page和limit同时被分页指示器双向绑定。
        page: 1,
        limit: 10,
      },
      // 总数，主要用于分页。
      count: undefined,
      // 当前显示的列表
      list: undefined,
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
    // 外部filter对象发生变化
    payload: {
      immediate: true,
      handler(newValue, oldValue) {
        if (isNil(newValue) && isNil(oldValue)) {
          return;
        }
        this.resetData();
      },
    },
    // 坚挺list变化，这里主要用于编辑表格内容变化自动同步到外层组件。
    list: {
      handler() {
        this.handleListChange();
      },
      deep: true,
    },
  },
  mounted() {
    this.$emit("mounted");
  },
  methods: {
    handleListChange() {
      if (this.type !== "input") {
        return;
      }
      let validList = this.list?.filter((row) => {
        for (const item of this.config?.columns) {
          if (item.required !== false) {
            if (keypath(row.models, item.value) === undefined) {
              return false;
            }
          }
        }
        return true;
      });
      validList = validList?.map((row) => row.models);
      if (validList?.length === 0) {
        validList = undefined;
      }
      this.$emit("update", validList);
    },
    keypath,
    resetData() {
      this.params.page = 1;
      this.reloadData();
    },
    reloadData() {
      if (this.type === "input") {
        // 初始化列表
        this.list = [];
        this.value?.forEach((item) => {
          this.appendRow(item);
        });
        if (this.list.length === 0) {
          this.appendRow();
        }
      } else {
        if (!this.url) return;
        // 清空数据，保证出现加载页面
        this.list = undefined;
        this.debounceReloadData();
      }
    },
    debounceReloadData() {},
    click(item, index) {
      if (this.config?.callback?.select) {
        this.config?.callback?.select(item, index);
      }
    },
    // 删除某一条
    removeRow(index) {
      this.list.splice(index, 1);
    },
    // 在尾部追加
    appendRow(models = {}) {
      this.list.push({ models });
    },
  },
};
</script>
