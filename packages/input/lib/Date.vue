<template>
  <div
    v-if="preview && isEditing === false"
    class="flex truncate items-center min-w-0 h-8 border-2 border-transparent rounded-md"
    :class="{
      'hover:border-primary': editable && disabled !== true,
    }"
    @click="onDbclick"
  >
    <a-tooltip class="min-w-0 truncate">
      <template #title>{{ value }}</template>
      <span class="px-2">{{ value }}</span>
    </a-tooltip>
  </div>
  <a-date-picker
    v-else
    ref="input"
    :value="localValue"
    :disabled="disabled"
    :placeholder="payload?.placeholder ?? '请选择' + payload?.label"
    format="YYYY-MM-DD"
    style="height: fit-content"
    @change="onChange"
  />
</template>

<script>
import _interface from "../mixin/input.js";
export default {
  mixins: [_interface],
  methods: {
    onChange(_, value) {
      this.localValue = value;
      this.onClickoutside();
    },
    onClickoutside() {
      const value = this.localValue;

      this.$emit("update", value);

      this.onBlur();
    },
  },
};
</script>
