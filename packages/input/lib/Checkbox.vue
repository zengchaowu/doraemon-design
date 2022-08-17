<template>
  <div
    class="flex truncate items-center min-w-0 h-8"
    v-clickoutside="onClickoutside"
  >
    <a-checkbox
      :checked="_value ?? value"
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
      this._value = event.target.checked;
    },
    onClickoutside() {
      const value = this._value;
      this._value = undefined;
      this.$emit("update", value);

      this.onBlur();
    },
  },
};
</script>
