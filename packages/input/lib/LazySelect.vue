<template>
  <div
    v-if="preview && isEditing === false"
    class="flex items-center truncate min-w-0 border-1 border-transparent rounded-md"
    :class="{
      'hover:border-primary': editable && disabled !== true,
    }"
    @click="onDbclick"
  >
    <a-tooltip class="min-w-0 truncate">
      <template #title>{{
        payload?.options
          ? parseSelect(payload?.options, value)
          : value?.join
          ? value?.join(",")
          : value
      }}</template>
      <span class="px-2">{{
        payload?.options
          ? parseSelect(payload?.options, value)
          : value?.join
          ? value?.join(",")
          : value
      }}</span>
    </a-tooltip>
  </div>
  <div v-else class="content" @click="onClick">
    <a-select
      ref="input"
      class="flex-grow"
      :value="localValue?.split ? localValue?.split(',') : localValue"
      :placeholder="payload?.placeholder ?? '请选择' + payload?.label"
      :disabled="disabled"
      :allow-clear="true"
      :mode="payload?.mode"
      @change="onChange"
      v-clickoutside="delayBlur"
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
          open && this.$refs.input.$el.click();
        } catch (error) {
          console.log(error);
          this.state = "fail";
        }
      }
    },
    onChange(value) {
      this.localValue = this.payload.onSelect
        ? value
        : value?.length > 0 || value?.toString()?.length > 0
        ? value?.join
          ? value.join(",")
          : value
        : undefined;

      this.onClickoutside();
    },
    onClickoutside() {
      const value = this.localValue;

      if (this.payload.onSelect) {
        this.payload.onSelect(value, this.options);
      } else {
        this.$emit("update", value);
      }

      this.onBlur();
    },
    delayBlur() {
      if (this.state === "success") {
        setTimeout(() => {
          this.onBlur();
        }, 100);
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
