<template>
  <div
    v-if="preview && isEditing === false"
    class="bg-gray-100 m-2 p-2 rounded-md whitespace-pre-wrap"
    @click="onDbclick"
  >
    <span>{{ value }}</span>
  </div>
  <a-textarea
    v-else
    ref="input"
    :value="localValue"
    :placeholder="payload?.placeholder ?? '请输入' + (payload?.label ?? '')"
    :disabled="disabled"
    :allow-clear="true"
    :rows="payload.rows ?? 4"
    @change="onChange"
    v-clickoutside="onClickoutside"
  />
</template>

<script>
import _interface from "../mixin/input.js";
export default {
  mixins: [_interface],
  methods: {
    onChange(event) {
      this.localValue = event.target.value;
    },
    onClickoutside() {
      const value = this.localValue;

      this.$emit("update", value);

      this.onBlur();
    },
  },
};
</script>
