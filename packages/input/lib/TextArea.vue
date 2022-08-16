<template>
  <div
    v-if="preview && isEditing === false"
    class="bg-gray-100 m-2 p-2 rounded-md whitespace-pre-wrap"
    @dblclick="onDbclick"
  >
    <span>{{ value }}</span>
  </div>
  <a-textarea
    v-else
    :value="value"
    :placeholder="payload?.placeholder ?? '请输入' + (payload?.label ?? '')"
    :disabled="disabled"
    :allow-clear="true"
    :rows="payload.rows ?? 4"
    @change="onChange"
    @keyup.esc="onBlur"
  />
</template>

<script>
import _interface from "../mixin/input.js";
export default {
  mixins: [_interface],
  methods: {
    onChange(event) {
      this.$emit("update", event.target.value);
    },
  },
};
</script>
