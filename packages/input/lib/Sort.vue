<template>
  <div
    v-if="preview && isEditing === false"
    class="flex truncate items-center min-w-0"
    @dblclick="onDbclick"
  >
    <a-tooltip class="min-w-0 truncate">
      <template #title>
        {{ parseSelect(payload?.options, value) }}
      </template>
      {{ parseSelect(payload?.options, value) }}
    </a-tooltip>
  </div>
  <a-select
    v-else
    :value="value"
    :placeholder="payload?.placeholder ?? '请选择' + payload?.label"
    :disabled="disabled"
    @change="onChange"
    v-clickoutside="onBlur"
  >
    <a-select-option
      v-for="(option, index) in payload?.options"
      :key="index"
      :value="option.value ?? option"
    >
      <span>
        {{ option.label ?? option }}
      </span>
    </a-select-option>
  </a-select>
</template>

<script>
import parseSelect from "../functions/parseSelect.js";
import _interface from "../mixin/input.js";
export default {
  mixins: [_interface],
  methods: {
    parseSelect,
    onChange(option) {
      this.$emit("update", option);
    },
  },
};
</script>
