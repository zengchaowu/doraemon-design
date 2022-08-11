<template>
  <div v-if="preview" class="flex truncate items-center min-w-0 h-8">
    <a-tooltip class="min-w-0 truncate">
      <template #title>
        {{ value }}
      </template>
      {{ value }}
    </a-tooltip>
  </div>
  <a-week-picker
    v-else
    :value="value?.split ? value?.split(',')[0] : value"
    :disabled="disabled"
    :placeholder="payload?.placeholder ?? '请选择' + payload?.label"
    :disabled-date="payload?.disabledDate"
    style="height: fit-content"
    @change="change"
  />
</template>

<script>
import _interface from "../mixin/input.js";
export default {
  mixins: [_interface],
  methods: {
    change(date) {
      this.$emit(
        "update",
        [
          date.isoWeekday(1).format("YYYY-MM-DD"),
          date.isoWeekday(7).format("YYYY-MM-DD"),
        ].join(",")
      );
    },
  },
};
</script>
