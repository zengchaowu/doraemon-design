<template>
  <div
    v-if="preview && isEditing === false"
    class="flex truncate items-center min-w-0 h-8"
    @dblclick="onDbclick"
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
    :value="localValue?.split(',')"
    :disabled-date="payload?.disabledDate"
    value-format="YYYY-MM-DD"
    @change="onChange"
    v-clickoutside="onClickoutside"
  />
</template>
<script>
import _interface from "../mixin/input.js";
export default {
  mixins: [_interface],
  methods: {
    onChange(value) {
      this.localValue = value;
    },
    onClickoutside() {
      const value = this.localValue;
      this.localValue = undefined;
      this.payload?.onChange && this.payload?.onChange(value);

      this.onBlur();
    },
  },
};
</script>
