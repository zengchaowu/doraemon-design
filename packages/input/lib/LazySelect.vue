<template>
  <div v-if="preview" class="flex items-center truncate min-w-0">
    <a-tooltip class="min-w-0 truncate">
      <template #title>
        {{ payload?.options ? parseSelect(payload?.options, value) : value }}
      </template>
      {{ payload?.options ? parseSelect(payload?.options, value) : value }}
    </a-tooltip>
  </div>
  <div v-else class="content" @click="onClick">
    <a-select
      ref="select"
      class="flex-grow"
      :value="value?.split ? value?.split(',') : value"
      :placeholder="payload?.placeholder ?? '请选择' + payload?.label"
      :disabled="disabled"
      :allow-clear="true"
      :mode="payload?.mode"
      @select="onSelect"
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
    reset() {
      this.state = undefined;
      this.options = undefined;
    },
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
    onSelect(value) {
      if (this.payload.onSelect) {
        this.payload.onSelect(value);
      } else if (value?.length > 0 || value?.toString()?.length > 0) {
        this.$emit("update", value?.join ? value.join(",") : value);
      } else {
        this.$emit("update", undefined);
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
