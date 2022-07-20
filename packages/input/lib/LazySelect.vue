<template>
  <div v-if="preview" class="flex truncate items-center min-w-0">
    <a-tooltip class="min-w-0 truncate">
      <template #title>
        {{ parseSelect(payload?.options, value) }}
      </template>
      {{ parseSelect(payload?.options, value) }}
    </a-tooltip>
  </div>
  <a-select
    v-else
    class="w-32"
    :value="value"
    :placeholder="payload?.placeholder ?? '请选择' + payload?.label"
    :disabled="disabled"
    @click.native="click"
    @change="(option) => $emit('update', option)"
  >
    <div slot="dropdownRender" slot-scope="menu">
      <div v-if="state === 'success'" class="content">
        <span v-if="options?.length > 0">加载失败</span>
        <span v-else>选项为空</span>
      </div>
      <div v-else-if="state === 'fail'" class="content">
        <span>加载失败</span>
      </div>
      <div v-else class="content">
        <a-spin />
      </div>
    </div>
  </a-select>
</template>

<script>
import parseSelect from "../functions/parseSelect.js";
import _interface from "../mixin/input.js";
export default {
  mixins: [_interface],
  data() {
    return {
      state: undefined, // loading success fail
      options: undefined,
    };
  },
  methods: {
    parseSelect,
    async click() {
      console.log(this.state);
      if (this.state === undefined || this.state === "fail") {
        this.state = "loading";
        try {
          const result = await this.payload?.getOptions();
          this.options = result;
          this.state = "success";
        } catch (error) {
          console.log(error);
          this.state = "fail";
        }
      }
    },
  },
};
</script>

<style scoped>
.content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}
</style>
