<template>
  <div v-if="preview" class="flex truncate items-center min-w-0">
    <a-tooltip class="min-w-0 truncate">
      <template #title>
        {{ parseSelect(payload?.options, value) }}
      </template>
      {{ parseSelect(payload?.options, value) }}
    </a-tooltip>
  </div>
  <div v-else class="content" @click="onClick">
    <a-select
      ref="select"
      class="flex-grow"
      :value="value?.split(',')"
      :placeholder="payload?.placeholder ?? '请选择' + payload?.label"
      :disabled="disabled"
      :allowClear="true"
      :mode="payload?.mode"
      @change="
        (option) => $emit('update', option.join ? option.join(',') : option)
      "
      :style="{ 'pointer-events': options ? undefined : 'none' }"
    >
      <a-select-option
        v-for="(option, index) in options"
        :key="index"
        :value="payload.valueForOption(option)"
      >
        <span>
          {{ payload.labelForOption(option) }}
        </span>
      </a-select-option>
    </a-select>
    <div v-if="state === 'loading'" class="state-loading">
      <a-spin size="small" />
    </div>
  </div>
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
    async onClick(open = false) {
      if (this.state === undefined || this.state === "fail") {
        this.state = "loading";
        try {
          const result = await this.payload?.getOptions();
          this.options = result;
          this.state = "success";
          open && this.$refs.select.$el.click();
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
  position: relative;
  cursor: pointer;
}

.state-loading {
  position: absolute;
  inset: 0;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
}
</style>
