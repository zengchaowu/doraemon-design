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
    :value="value?.split(',')"
    :disabled-date="payload?.disabledDate"
    value-format="YYYY-MM-DD"
    @change="dateRangeChange"
    @keyup.esc="onBlur"
  />
</template>
<script>
import _interface from "../mixin/input.js";
export default {
  mixins: [_interface],
  methods: {
    dateRangeChange(result) {
      this.payload?.onChange && this.payload?.onChange(result);
    },
  },
};
</script>
