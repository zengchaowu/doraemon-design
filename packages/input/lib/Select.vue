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
    :value="value?.split ? value?.split(',') : value"
    :placeholder="payload?.placeholder ?? '请选择' + payload?.label"
    :disabled="disabled"
    :allow-clear="true"
    :mode="payload?.mode"
    @change="onChange"
    @keyup.esc="onBlur"
  >
    <a-select-option
      v-for="(option, index) in payload?.options"
      :key="index"
      :value="option.value"
    >
      <span>
        {{ option.label }}
      </span>
    </a-select-option>
  </a-select>
</template>

<script>
import parseSelect from "../functions/parseSelect.js";
import mixinInput from "../mixin/input.js";
export default {
  mixins: [mixinInput],
  methods: {
    parseSelect,
    onChange(option) {
      if (option?.length > 0 || option?.toString()?.length > 0) {
        this.$emit("update", option?.join ? option.join(",") : option);
      } else {
        this.$emit("update", undefined);
      }
      this.onBlur();
    },
  },
};
</script>
