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
  <a-input
    v-else
    :value="value"
    :placeholder="payload?.placeholder ?? '请输入' + (payload?.label ?? '')"
    :disabled="disabled"
    :allow-clear="true"
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
