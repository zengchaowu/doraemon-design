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
  <a-date-picker
    v-else
    :value="localValue ?? value"
    :disabled="disabled"
    :placeholder="payload?.placeholder ?? '请选择' + payload?.label"
    format="YYYY-MM-DD"
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
    onChange(_, value) {
      this.localValue = value;
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
