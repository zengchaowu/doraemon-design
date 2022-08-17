<template>
  <div
    v-if="preview && isEditing === false"
    class="flex truncate items-center min-w-0 h-8 border-1 border-transparent px-2 rounded-md"
    :class="{
      'hover:border-border': editable && disabled !== true,
    }"
    @click="onDbclick"
  >
    <a-tooltip class="min-w-0 truncate">
      <template #title>
        {{ value }}
      </template>
      {{ value }}
    </a-tooltip>
  </div>
  <a-range-picker
    v-else
    ref="input"
    :value="localValue?.split ? localValue?.split(',') : localValue"
    :disabled-date="payload?.disabledDate"
    value-format="YYYY-MM-DD"
    @change="onChange"
  />
</template>
<script>
import _interface from "../mixin/input.js";
export default {
  mixins: [_interface],
  methods: {
    onChange(value) {
      this.localValue = value.join(",");
      this.onClickoutside();
    },
    onClickoutside() {
      const value = this.localValue;

      this.payload?.onChange && this.payload?.onChange(value);

      this.onBlur();
    },
  },
};
</script>
