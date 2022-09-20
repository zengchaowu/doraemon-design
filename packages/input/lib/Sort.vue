<template>
  <div
    v-if="preview && isEditing === false"
    class="flex truncate items-center min-w-0 border-1 border-transparent rounded-md"
    :class="{
      'hover:border-primary': editable && disabled !== true,
    }"
    @click="onDbclick"
  >
    <a-tooltip class="min-w-0 truncate">
      <template #title>{{ parseSelect(payload?.options, value) }}</template>
      <span class="px-2">{{ parseSelect(payload?.options, value) }}</span>
    </a-tooltip>
  </div>
  <a-select
    v-else
    ref="input"
    :value="localValue"
    :placeholder="payload?.placeholder ?? '请选择' + payload?.label"
    :disabled="disabled"
    @change="onChange"
    v-clickoutside="onClickoutside"
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
      this.localValue = option;
    },
    onClickoutside() {
      const value = this.localValue;

      this.$emit("update", value);

      this.onBlur();
    },
  },
};
</script>
