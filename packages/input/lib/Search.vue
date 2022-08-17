<template>
  <div
    v-if="preview && isEditing === false"
    class="flex truncate items-center min-w-0 border-1 border-transparent rounded-md"
    :class="{
      'hover:border-border': editable && disabled !== true,
    }"
    @click="onDbclick"
  >
    <span class="truncate">{{ value }}</span>
  </div>
  <a-input-search
    v-else
    ref="input"
    :value="localValue"
    :placeholder="payload?.placeholder ?? '请输入' + (payload?.label ?? '')"
    :disabled="disabled"
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

      this.$emit("update", value);

      this.onBlur();
    },
  },
};
</script>
