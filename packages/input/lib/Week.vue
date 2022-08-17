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
  <a-week-picker
    v-else
    :value="
      (localValue ?? value)?.split
        ? (localValue ?? value)?.split(',')[0]
        : localValue ?? value
    "
    :disabled="disabled"
    :placeholder="payload?.placeholder ?? '请选择' + payload?.label"
    :disabled-date="payload?.disabledDate"
    style="height: fit-content"
    @change="onChange"
    v-clickoutside="onClickoutside"
  />
</template>

<script>
import _interface from "../mixin/input.js";
export default {
  mixins: [_interface],
  methods: {
    onChange(date) {
      this.localValue = date
        ? [
            date.isoWeekday(1).format("YYYY-MM-DD"),
            date.isoWeekday(7).format("YYYY-MM-DD"),
          ].join(",")
        : undefined;
    },
    onClickoutside() {
      const value = this.localValue;
      this.localValue = undefined;
      this.$emit("update", value);

      this.onBlur();
    },
  },
};
</script>
