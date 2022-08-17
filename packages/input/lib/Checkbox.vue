<template>
  <div class="flex truncate items-center min-w-0 h-8">
    <a-checkbox
      ref="input"
      :checked="localValue"
      :disabled="disabled"
      @change="onChange"
    >
      {{ payload?.label }}
    </a-checkbox>
  </div>
</template>

<script>
import _interface from "../mixin/input.js";
export default {
  mixins: [_interface],
  methods: {
    onChange(event) {
      this.localValue = event.target.checked;
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
